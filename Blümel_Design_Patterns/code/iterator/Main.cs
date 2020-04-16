using System;
using System.Collections;
using System.Collections.Generic;

namespace Program
{
    class Program
    {

        static void Main(string[] args)
        {
            string[] array = { "Obi-Wan: Hello there.", "Grievous: General Kenobi!", "Grievous: You are a bold one.", "Grievous: Kill him!", "*Magna-Guards die*", "Grievous: Back Away.", "Grievous: I will deal with this Jedi slime myself.", "Obi-Wan: Your Move.", "Grievous: You fool.", "Grievous: I've been trained in your Jedi arts by Count Dooku.", "*pulls out four lightsabers*", "Grievous: Attack, Kenobi!", "*spins like a ceiling fan*" };
            var list = new List<string>(array);

            #region Invisible
            {
                Console.WriteLine("--------------------------");
                Console.WriteLine("Invisible (foreach):\n");

                //The foreach keyword allows you to iterate the list without even knowing that there is an iterator in the background.
                foreach (var s in list) Console.WriteLine(s);
            }
            #endregion

            #region Formal
            {
                Console.WriteLine("--------------------------");
                Console.WriteLine("Formal (while):\n");

                //If there was no foreach, you would use it like this (or using a while-loop):
                for(var iterator = list.GetEnumerator(); iterator.MoveNext();) Console.WriteLine(iterator.Current);
                //using var iterator = list.GetEnumerator();
                //while (iterator.MoveNext()) Console.WriteLine(iterator.Current);
            }
            #endregion

            #region Informal
            {
                Console.WriteLine("--------------------------");
                Console.WriteLine("Informal:\n");

                Console.WriteLine("- Reverse:\n");

                //ReverseList (and RandomList as well) is a modified List as defined below the Main() method.
                var reverseList = new ReverseList<string>(array);

                //This custom implementation can now be used the same way as the formal one:
                Console.WriteLine("  Invisible-ish:");
                foreach (var s in reverseList) Console.WriteLine(s);

                Console.WriteLine("\n  Formal-ish:");
                for (var reverseIterator = reverseList.GetEnumerator(); reverseIterator.MoveNext();) Console.WriteLine(reverseIterator.Current);
                //using var reverseIterator = reverseList.GetEnumerator();
                //while (reverseIterator.MoveNext()) Console.WriteLine(reverseIterator.Current);

                Console.WriteLine("\n- Random:\n");

                var randomList = new RandomList<string>(array, new Random());

                Console.WriteLine("  Invisible-ish:");
                foreach (var s in randomList) Console.WriteLine(s);

                Console.WriteLine("\n  Formal-ish:");
                for (var randomIterator = randomList.GetEnumerator(); randomIterator.MoveNext();) Console.WriteLine(randomIterator.Current);
                //using var randomIterator = randomList.GetEnumerator();
                //while (randomIterator.MoveNext()) Console.WriteLine(randomIterator.Current);
            }
            #endregion

            Console.WriteLine("--------------------------");
            Console.ReadKey();
        }

        /// <summary>
        /// ReverseList is a normal List for the most part, only it iterates its elements in the reverse direction.
        /// </summary>
        /// <typeparam name="T">The type of elements in the list</typeparam>
        private class ReverseList<T> : List<T>
        {
            /// <summary>
            /// 
            /// </summary>
            /// <param name="enumerable">Any IEnumerable of type T whose elements should be added to the list</param>
            public ReverseList(IEnumerable<T> enumerable) : base(enumerable) { }

            public new IEnumerator<T> GetEnumerator()
            {
                return new ReverseIterator<T>(this);
            }

            /// <summary>
            /// This List's iterator
            /// </summary>
            /// <typeparam name="U">The type of elements to be iterated</typeparam>
            private class ReverseIterator<U> : IEnumerator<U>
            {
                private List<U> _list;
                private int _postion;

                public U Current
                {
                    get
                    {
                        try
                        {
                            return this._list[this._postion];
                        }
                        catch (IndexOutOfRangeException)
                        {
                            return default;
                        }
                    }
                }

                object IEnumerator.Current => throw new NotImplementedException();

                public ReverseIterator(List<U> list)
                {
                    this._list = list;
                    this.Reset();
                }

                public void Dispose() { }

                public bool MoveNext()
                {
                    return this._postion-- > 0;
                }

                public void Reset()
                {
                    this._postion = this._list.Count;
                }
            }
        }

        /// <summary>
        /// RandomList is a normal List for the most part, only it iterates its elements in random order every time.
        /// </summary>
        /// <typeparam name="T">The type of elements in the list</typeparam>
        private class RandomList<T> : List<T>
        {
            private Random _random;

            /// <summary>
            /// 
            /// </summary>
            /// <param name="enumerable">Any IEnumerable of type T whose elements should be added to the list</param>
            /// <param name="random">The random number generator used for iterating the List</param>
            public RandomList(IEnumerable<T> enumerable, Random random) : base(enumerable)
            {
                this._random = random;
            }

            public new IEnumerator<T> GetEnumerator()
            {
                return new RandomIterator<T>(this, this._random);
            }

            /// <summary>
            /// This List's iterator
            /// </summary>
            /// <typeparam name="U">The type of elements to be iterated</typeparam>
            private class RandomIterator<U> : IEnumerator<U>
            {
                private List<U> _list, _remaining;
                private U _current;
                private Random _random;

                public U Current { get => this._current; }

                object IEnumerator.Current => throw new NotImplementedException();

                public RandomIterator(List<U> list, Random random)
                {
                    this._random = random;
                    this._list = list;
                    this.Reset();
                }

                public void Dispose() { }

                public bool MoveNext()
                {
                    if (this._remaining.Count < 1) return false;
                    this._remaining.Remove(this._current = this._remaining[this._random.Next(0, this._remaining.Count)]);
                    return true;
                }

                public void Reset()
                {
                    U[] remaining = new U[this._list.Count];
                    this._list.CopyTo(remaining);
                    this._remaining = new List<U>(remaining);
                }
            }
        }
    }
}
