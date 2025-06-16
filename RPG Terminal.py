import random

class Personnage:
    def __init__(self, nom, points_de_vie, potions=0):
        self.nom = nom
        self.points_de_vie = points_de_vie
        self.potions = potions
        self.skip_turn = False  # Indicateur pour savoir si le personnage doit passer son tour

    def attaquer(self, cible, min_dmg, max_dmg):
        degats = random.randint(min_dmg, max_dmg)
        cible.points_de_vie -= degats
        return degats

    def utiliser_potion(self, min_heal, max_heal):
        if self.potions > 0:
            soin = random.randint(min_heal, max_heal)
            self.points_de_vie += soin
            self.potions -= 1
            self.skip_turn = True
            return soin
        else:
            return None


def start_game():
    print("Bienvenue dans le jeu de rôle !")
    hero_name = input("Entrez le nom de votre héros : ")
    enemy_name = input("Entrez le nom de votre ennemi : ")

    # Création des personnages
    hero = Personnage(hero_name, 50, potions=3)
    enemy = Personnage(enemy_name, 50)

    turn_count = 0

    print(f"\n{hero.nom} et {enemy.nom} commencent avec 50 points de vie chacun.")
    print(f"{hero.nom} dispose de {hero.potions} potions.\n")

    while hero.points_de_vie > 0 and enemy.points_de_vie > 0:
        turn_count += 1
        print(f"--- Tour {turn_count} ---")
        print(f"Points de vie de {hero.nom} : {hero.points_de_vie}")
        print(f"Points de vie de {enemy.nom} : {enemy.points_de_vie}")
        print(f"Potions restantes : {hero.potions}\n")

        if hero.skip_turn:
            print(f"{hero.nom} passe son tour à cause de l'utilisation de la potion précédente.\n")
            hero.skip_turn = False
        else:
            action = input("Voulez-vous attaquer (1) ou utiliser une potion (2) ? ")

            if action == "1":
                # Attaque du héros
                degats = hero.attaquer(enemy, 5, 10)
                print(f"\n{hero.nom} attaque {enemy.nom} et inflige {degats} points de dégâts.")
            elif action == "2":
                soin = hero.utiliser_potion(15, 50)
                if soin is not None:
                    print(f"\n{hero.nom} utilise une potion et récupère {soin} points de vie.")
                    print(f"{hero.nom} a maintenant {hero.points_de_vie} points de vie.")
                else:
                    print("\nVous n'avez plus de potions ! Vous perdez votre tour.\n")
                    continue
            else:
                print("\nAction invalide. Vous perdez votre tour.\n")
                continue

        # Attaque de l'ennemi
        if enemy.points_de_vie > 0:
            degats = enemy.attaquer(hero, 5, 15)
            print(f"{enemy.nom} attaque {hero.nom} et inflige {degats} points de dégâts.\n")

    # Fin de la partie
    if hero.points_de_vie > 0:
        print(f"\nFélicitations ! {hero.nom} a vaincu {enemy.nom} en {turn_count} tours.")
    else:
        print(f"\nDommage ! {enemy.nom} a vaincu {hero.nom} en {turn_count} tours.")

    # Rejouer
    replay = input("\nVoulez-vous recommencer une partie ? (oui/non) : ").lower()
    if replay == "oui":
        start_game()
    else:
        print("Merci d'avoir joué ! À bientôt.")


# Lancer le jeu
start_game()