#include "enchanted_sword.h"
#include <stdio.h>

int main()
{
  struct EnchantedSword * sword;
  sword = create_sword("diamond", 5);
  attack_monster(20, sword);
  attack_monster(10, sword);
  // ^ This works just fine.
  printf("%s\n", sword -> material);
  // ^ This would work just fine in enchanted_sword.c, but here it will cause an error at compile time.

  return 0;
}
