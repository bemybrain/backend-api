using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Entidades
{
    [Serializable()]
    public class ArrayOfUsuario
    {
        public ArrayOfUsuario()
        {
            this.Usuario = new List<Usuario>();
        }

        [XmlElement("Usuario")]
        public List<Usuario> Usuario { get; set; }
    }
}
