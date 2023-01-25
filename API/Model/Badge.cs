using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Badge
    {
        public int ID;
        public string Code;
        public string edv;

        public static string GetEdvByCode(string code)
        {
            using var db = new Context();
            var result = db.badges.FirstOrDefault(q => q.Code == code);
            if (result != null)
            {
                return result.edv;
            }
            return null;
        }
    }
}
