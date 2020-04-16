using System;

namespace Program
{
    class Program
    {
        public static void Main(string[] args)
        {
            EnchantedSword sword = new EnchantedSword("diamond", 5);
            sword.AttackMonster(20);
            sword.AttackMonster(10);
            // ^ This works just fine.
            Console.WriteLine(sword.material);
            // ^ This will cause an error at compile time.
        }
    }
}