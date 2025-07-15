import pygame
import random
import math
import sys

def show_fireworks():
    """在桌面上显示一次烟花效果（按ESC退出）"""
    # 初始化pygame
    pygame.init()
    
    # 屏幕设置（全屏/窗口模式）
    WIDTH, HEIGHT = 1200, 800
    screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.NOFRAME)
    pygame.display.set_caption("烟花盛宴")

    # 颜色定义
    BLACK = (0, 0, 0)
    COLORS = [
        (255, 0, 0), (0, 255, 0), (0, 0, 255),
        (255, 255, 0), (255, 0, 255), (0, 255, 255),
        (255, 165, 0), (128, 0, 128)
    ]

    class Particle:
        """烟花粒子"""
        def __init__(self, x, y, color):
            self.x = x
            self.y = y
            self.color = color
            self.radius = random.randint(2, 4)
            self.speed = random.uniform(2, 6)
            self.angle = random.uniform(0, math.pi * 2)
            self.vx = math.cos(self.angle) * self.speed
            self.vy = math.sin(self.angle) * self.speed
            self.gravity = 0.1
            self.life = 100

        def update(self):
            self.x += self.vx
            self.y += self.vy
            self.vy += self.gravity
            self.life -= 1

        def draw(self, screen):
            alpha = min(255, self.life * 3)
            color = (*self.color[:3], alpha) if len(self.color) == 4 else self.color
            pygame.draw.circle(screen, color, (int(self.x), int(self.y)), self.radius)

    class Firework:
        """单个烟花"""
        def __init__(self, x, y):
            self.x = x
            self.y = y
            self.color = random.choice(COLORS)
            self.particles = []
            self.exploded = False

        def explode(self):
            for _ in range(100):
                self.particles.append(Particle(self.x, self.y, self.color))
            self.exploded = True

        def update(self):
            if not self.exploded:
                self.y -= 5
                if self.y <= random.randint(50, HEIGHT // 2):
                    self.explode()

            for particle in self.particles[:]:
                particle.update()
                if particle.life <= 0:
                    self.particles.remove(particle)

        def draw(self, screen):
            if not self.exploded:
                pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), 3)

            for particle in self.particles:
                particle.draw(screen)

    # 主渲染逻辑
    fireworks = []
    clock = pygame.time.Clock()
    running = True
    start_time = pygame.time.get_ticks()
    duration = 10000  # 演示10秒

    while running:
        current_time = pygame.time.get_ticks()
        if current_time - start_time >= duration:
            running = False

        screen.fill(BLACK)

        # 持续生成新烟花（前8秒）
        if current_time - start_time < 8000 and random.random() < 0.05:
            fireworks.append(Firework(random.randint(50, WIDTH - 50), HEIGHT))

        # 更新和绘制所有烟花
        for firework in fireworks[:]:
            firework.update()
            firework.draw(screen)
            if firework.exploded and len(firework.particles) == 0:
                fireworks.remove(firework)

        pygame.display.flip()
        clock.tick(60)

        # 检测退出事件
        for event in pygame.event.get():
            if event.type == pygame.QUIT or (event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE):
                running = False

    pygame.quit()

if __name__ == "__main__":
    # 直接运行时演示一次
    show_fireworks()