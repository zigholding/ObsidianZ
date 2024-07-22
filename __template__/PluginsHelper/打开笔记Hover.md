
<%*  
let targets = {
'今日事项Tab':'今日事项',
'Cue & Sum': 'Cue & Sum',  
'人生进度':'人生进度',
};  
  
let target = await tp.system.suggester(
	Object.values(targets), 
	Object.keys(targets), 
	true, 
	'Select callout type.'
); 

note = tp.file.find_tfile(target);
console.log(note);
if(note){
await app.workspace.getLeaf(true).openFile(note);
await app.commands.executeCommandById(
"markdown:toggle-preview"
)
await app.commands.executeCommandById(
"obsidian-hover-editor:convert-active-pane-to-popover"
)
}
-%>