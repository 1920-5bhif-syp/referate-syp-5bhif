struct EnchantedSword;

struct EnchantedSword * create_sword(char * material, int sharpness_level);
void attack_monster(int enemy_health, struct EnchantedSword * sword);
