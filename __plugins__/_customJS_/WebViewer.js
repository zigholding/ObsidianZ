class WebViwer {
  get_view_of_webviewer(active=false){
    let a = [];
    app.workspace.iterateAllLeaves(
      x=>{
        if(x.view.webview){
          a.push(x)
        }
      }
    )
    if(active){
      a = a.filter(x=>x.containerEl.className.contains('mod-active'));
    }
    return a.map(x=>x.view);
  }

async get_src_of_view(view){
  if(!view.webview){return '';}
  let html = await view.webview.executeJavaScript(`document.documentElement.outerHTML`);
      return html;
  
}

  html_to_dom(html){
    let parser = new DOMParser();
    let dom = parser.parseFromString(html, "text/html");
    return dom;
  }

  html_to_markdown(html) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");
      
      function convertNode(node) {
        let markdown = "";
        if (node.nodeType === 1) { // Node.ELEMENT_NODE
          switch (node.nodeName.toLowerCase()) {
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              let level = parseInt(node.nodeName.charAt(1), 10);
              markdown += "#".repeat(level) + " " + node.textContent.trim() + "\n\n";
              break;
    
            case "p":
              markdown += node.textContent.trim() + "\n\n";
              break;
    
            case "ul":
            case "ol":
              node.childNodes.forEach((child) => {
                if (child.nodeName.toLowerCase() === "li") {
                  markdown += "- " + child.textContent.trim() + "\n";
                }
              });
              markdown += "\n";
              break;
    
            case "a":
              markdown += `[${node.textContent.trim()}](${node.getAttribute("href")})`;
              break;
    
            case "img":
              markdown += `![${node.getAttribute("alt") || "Image"}](${node.getAttribute("src")})`;
              break;
    
            case "strong":
            case "b":
              markdown += `**${node.textContent.trim()}**`;
              break;
    
            case "em":
            case "i":
              markdown += `*${node.textContent.trim()}*`;
              break;
    
            case "blockquote":
              markdown += "> " + node.textContent.trim() + "\n\n";
              break;
    
            case "pre":
              if (node.firstChild && node.firstChild.nodeName.toLowerCase() === "code") {
                  let code = node.firstChild.textContent.trim();
                  markdown += "```" + "\n" + code + "\n" + "```" + "\n\n";
              }
              break;

            case 'code':
              markdown += "`" + node.textContent + "`" ;
              break;
            
            case '#text':
              markdown += node.textContent.trim();
              break;
    
            default:
              node.childNodes.forEach((child) => {
                markdown += convertNode(child);
              });
          }
        } else if (node.nodeType === 3) { //Node.TEXT_NODE
            markdown += node.textContent.trim();
        }
        return markdown;
      }
      let md = convertNode(doc.body);
      return md;
  }


  kimi_to_markdown(html){
      let doc = this.html_to_dom(html);
      let spans = doc.querySelectorAll('span.segment-code-copy[data-v-d3e67ab0]');
      spans.forEach(span => {
          span.remove();
      });
      let ctx = ''
      let chats = doc.getElementsByClassName("chat-content-item");
      for (let i = 0; i < chats.length; i++) {
          let item = chats[i].getElementsByClassName('segment-content-box')[0];
          
          let is_user = chats[i].getElementsByClassName('segment-user').length>0;
          let prev = `[!NOTE] Kimi`
          if(is_user){
              prev = `[!Question] User`
          }
          let cctx = this.html_to_markdown(item.outerHTML).replace(/JavaScript```/g,'\n\n```js').replace(/\n/g,'\n> ');
          ctx = ctx+`\n\n> ${prev}\n>\n> ${cctx}`;
      }
      ctx = ctx+'\n';
      return ctx;
  }

  async save_as_markdown(view){
    let nc = app.plugins.getPlugin('note-chain');
    if(view.webview.src.startsWith('https://kimi.moonshot.cn')){
      let html = await this.get_src_of_view(view);
      let ctx = this.kimi_to_markdown(html)
      let webviewer = app.internalPlugins.plugins['webviewer']
      let folder = webviewer.instance.options.markdownPath;
      let path = ''
      if(folder){
        path = app.vault.getAvailablePath(folder+'/' + view.title, "md");
      }else{
        path = app.vault.getAvailablePath(view.title, "md");
      }
      await navigator.clipboard.writeText(ctx)
      let tfile = await app.vault.create(path,ctx);
      
      nc.chain.open_note(tfile);
    }else{
      let tfile = await view.saveAsMarkdown();
      nc.chain.open_note(tfile);
    }
  }
}
