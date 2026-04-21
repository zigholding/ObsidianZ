import pygame
import random
import math
import colorsys
import os

WIDTH, HEIGHT = 1200, 800

pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("终极烟花秀")
clock = pygame.time.Clock()

# 🌌 星空
stars = [(random.randint(0, WIDTH), random.randint(0, HEIGHT), random.randint(1,3)) for _ in range(120)]

def draw_stars():
    for x, y, r in stars:
        pygame.draw.circle(screen, (200,200,200), (x,y), r)

# 🌈 HSV
def hsv_color(t):
    r, g, b = colorsys.hsv_to_rgb(t % 1.0, 1, 1)
    return int(r*255), int(g*255), int(b*255)

# 🎯 粒子
class Particle:
    def __init__(self, x, y, vx, vy, hue):
        self.x, self.y = x, y
        self.vx, self.vy = vx, vy
        self.life = 100
        self.max_life = 100
        self.hue = hue
        self.gravity = 0.12
        self.drag = 0.985
        self.trail = []

    def update(self):
        self.trail.append((self.x, self.y))
        if len(self.trail) > 8:
            self.trail.pop(0)

        self.vx *= self.drag
        self.vy *= self.drag
        self.vy += self.gravity

        self.x += self.vx
        self.y += self.vy
        self.life -= 1

    def draw(self):
        if self.life <= 0:
            return

        color = hsv_color(self.hue + (1 - self.life/self.max_life)*0.2)

        for i, pos in enumerate(self.trail):
            alpha = int(255 * i / len(self.trail))
            surf = pygame.Surface((6,6), pygame.SRCALPHA)
            pygame.draw.circle(surf, (*color, alpha), (3,3), 3)
            screen.blit(surf, pos)

        alpha = int(255 * self.life/self.max_life)
        surf = pygame.Surface((6,6), pygame.SRCALPHA)
        pygame.draw.circle(surf, (*color, alpha), (3,3), 3)
        screen.blit(surf, (self.x, self.y))

# ❤️ 心形
def heart(x, y, hue):
    ps = []
    for t in [i*0.1 for i in range(60)]:
        px = 16 * math.sin(t)**3
        py = 13*math.cos(t)-5*math.cos(2*t)-2*math.cos(3*t)-math.cos(4*t)
        ps.append(Particle(x, y, px*0.4, -py*0.4, hue))
    return ps

# 🈶 中文烟花（核心）
def chinese_firework(x, y, text, hue):
    particles = []

    # 自动寻找字体
    font_path = None
    for path in [
        "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/simhei.ttf"
    ]:
        if os.path.exists(path):
            font_path = path
            break

    font = pygame.font.Font(font_path, 120)

    surf = font.render(text, True, (255,255,255))
    w, h = surf.get_size()

    for px in range(0, w, 3):
        for py in range(0, h, 3):
            if surf.get_at((px, py))[0] > 0:
                vx = (px - w/2) * 0.08
                vy = (py - h/2) * 0.08
                particles.append(Particle(x, y, vx, vy, hue))

    return particles

# 🎇 烟花
class Firework:
    def __init__(self, x, mode="random", text=""):
        self.x = x
        self.y = HEIGHT
        self.vy = random.uniform(-10, -12)
        self.exploded = False
        self.particles = []
        self.mode = mode
        self.text = text
        self.hue = random.random()

    def explode(self):
        if self.mode == "heart":
            self.particles += heart(self.x, self.y, self.hue)

        elif self.mode in ["text", "chinese"]:
            self.particles += chinese_firework(self.x, self.y, self.text, self.hue)

        else:
            for _ in range(120):
                angle = random.uniform(0, math.pi*2)
                speed = random.uniform(2,6)
                vx = math.cos(angle)*speed
                vy = math.sin(angle)*speed
                self.particles.append(Particle(self.x, self.y, vx, vy, self.hue))

        self.exploded = True

    def update(self):
        if not self.exploded:
            self.y += self.vy
            self.vy += 0.15
            if self.vy >= 0:
                self.explode()

        for p in self.particles:
            p.update()

        self.particles = [p for p in self.particles if p.life > 0]

    def draw(self):
        if not self.exploded:
            pygame.draw.line(screen, (255,255,255),
                             (self.x,self.y),
                             (self.x,self.y+12), 2)

        for p in self.particles:
            p.draw()

# 🎮 状态
fireworks = []
input_text = ""
typing = False

fade = pygame.Surface((WIDTH, HEIGHT))
fade.set_alpha(40)
fade.fill((0,0,0))

font_ui = pygame.font.SysFont(None, 36)

running = True

while running:
    screen.blit(fade, (0,0))
    draw_stars()

    # 自动烟花
    if random.random() < 0.04:
        fireworks.append(Firework(random.randint(100, WIDTH-100)))

    for fw in fireworks[:]:
        fw.update()
        fw.draw()
        if fw.exploded and not fw.particles:
            fireworks.remove(fw)

    # UI 输入提示
    if typing:
        txt = font_ui.render("输入: " + input_text, True, (255,255,255))
        screen.blit(txt, (20, HEIGHT - 50))

    pygame.display.flip()
    clock.tick(60)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif event.type == pygame.MOUSEBUTTONDOWN:
            x, y = pygame.mouse.get_pos()
            fw = Firework(x)
            fw.y = y
            fw.explode()
            fireworks.append(fw)

        elif event.type == pygame.KEYDOWN:

            if typing:
                if event.key == pygame.K_RETURN:
                    fireworks.append(Firework(WIDTH//2, "chinese", input_text))
                    typing = False

                elif event.key == pygame.K_BACKSPACE:
                    input_text = input_text[:-1]

                elif event.key == pygame.K_ESCAPE:
                    typing = False

                else:
                    input_text += event.unicode

            else:
                if event.key == pygame.K_ESCAPE:
                    running = False

                elif event.key == pygame.K_h:
                    fireworks.append(Firework(random.randint(200,1000), "heart"))

                elif event.key == pygame.K_t:
                    typing = True
                    input_text = ""

                elif event.key == pygame.K_c:
                    fireworks.append(Firework(random.randint(200,1000)))

pygame.quit()