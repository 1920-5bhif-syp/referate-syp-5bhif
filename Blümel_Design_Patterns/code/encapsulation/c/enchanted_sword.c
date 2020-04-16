#include "enchanted_sword.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct EnchantedSword
{
  char * material;
  int base_damage;
  int sharpness_level;
};


struct EnchantedSword * create_sword(char * material, int sharpness_level)
{
  struct EnchantedSword * sword;
  sword = malloc(sizeof(struct EnchantedSword));
  sword -> sharpness_level = sharpness_level;

  sword -> material = material;

  if(strcmp(material, "wood") == 0)
  {
    sword -> base_damage = 4;
  }
  else if(strcmp(material, "gold") == 0)
  {
    sword -> base_damage = 4;
  }
  else if(strcmp(material, "stone") == 0)
  {
    sword -> base_damage = 5;
  }
  else if(strcmp(material, "iron") == 0)
  {
    sword -> base_damage = 6;
  }
  else if(strcmp(material, "diamond") == 0)
  {
    sword -> base_damage = 7;
  }
  else
  {
    sword -> base_damage = 1;
  }
}

void attack_monster(int enemy_health, struct EnchantedSword * sword)
{
  printf("Attacking monster (Health %d) with %s sword (Sharpness %d)\n", enemy_health, sword -> material, sword -> sharpness_level);
  enemy_health -= sword -> base_damage + (sword -> sharpness_level + 1) / 2;

  if(enemy_health > 0)
  {
    printf("The monster survived (Health %d)\n", enemy_health);
  }
  else
  {
    printf("he ded\n");
  }
}
