using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;
using System.Web;

namespace Report
{
    public static class CustomFontsHelper
    {

        static PrivateFontCollection fontCollection;
        public static FontCollection FontCollection
        {
            get
            {
                if (fontCollection == null)
                {
                    fontCollection = new PrivateFontCollection();
                    fontCollection.AddFontFile(HttpContext.Current.Server.MapPath("~/Fonts/B-NAZANIN.ttf"));
                }
                return fontCollection;
            }
        }

        public static FontFamily GetFamily(string familyName)
        {
            return FontCollection.Families.FirstOrDefault(ff => ff.Name == familyName);
        }
    }
}