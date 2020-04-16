using System;

namespace Program
{
    public class EnchantedSword
    {
        private string material;
        private int base_damage;
        private int sharpnessLevel;

        public EnchantedSword(string material, int sharpnessLevel)
        {
            this.material = material;
            this.sharpnessLevel = sharpnessLevel;

            switch (material)
            {
                case "wood":
                    this.base_damage = 4;
                    break;
                case "gold":
                    this.base_damage = 4;
                    break;
                case "stone":
                    this.base_damage = 5;
                    break;
                case "iron":
                    this.base_damage = 6;
                    break;
                case "diamond":
                    this.base_damage = 7;
                    break;
                default:
                    this.base_damage = 1;
                    break;
            }
        }

        public void AttackMonster(int enemyHealth)
        {
            Console.WriteLine("Attacking monster (Health {0}) with {1} sword (Sharpness {2})", enemyHealth, this.material, this.sharpnessLevel);
            enemyHealth -= (int)(this.base_damage + .5 * (this.sharpnessLevel + 1));
            if(enemyHealth > 0) Console.WriteLine("The monster survived (Health {0})", enemyHealth);
            else Console.WriteLine("he ded");
        }
    }
}