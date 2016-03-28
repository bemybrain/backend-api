using System;
using System.Xml.Linq;
using System.Xml.Serialization;
using Entidades;
using System.Web;

namespace BeMyBrain_Teste
{
    public partial class LoginUC : System.Web.UI.UserControl
    {
        System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
        Uri usuarioUri;

        HttpContext context = HttpContext.Current;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (!string.IsNullOrEmpty((string)context.Session["Usuario"]))
                {
                    Label1.Text = $"Bem vindo {(string)context.Session["Usuario"]} !";

                    Label1.Visible = true;

                    Panel1.Visible = false;

                    btnLogout.Visible = true;
                }
            }

        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            client.BaseAddress = new Uri("http://localhost:2561");
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/xml"));
            //chamando a api pela url
            System.Net.Http.HttpResponseMessage response = client.GetAsync($"api/usuario/?login={txtLogin.Text}&senha={txtSenha.Text}").Result;

            //se retornar com sucesso busca os dados

            //pegando o cabeçalho
            usuarioUri = response.Headers.Location;

            //Pegando os dados do Rest e armazenando na variável usuários
            var usuarios = response.Content.ReadAsStringAsync().Result;

            //converte o xml string para XDocument
            var xxx = XDocument.Parse(usuarios);

            //Deserializa o XDocument
            var obj = (ArrayOfUsuario)new XmlSerializer(typeof(ArrayOfUsuario)).Deserialize(xxx.CreateReader());

            Usuario u = new Usuario();

            foreach (var item in obj.Usuario)
            {
                u.Nome = item.Nome;
            }

            Label1.Text = $"Bem vindo {u.Nome} !";

            Label1.Visible = true;

            Panel1.Visible = false;

            btnLogout.Visible = true;

            context.Session["Usuario"] = u.Nome;

            Response.Redirect("~/Default.aspx");
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            Label1.Visible = false;

            Panel1.Visible = true;

            btnLogout.Visible = false;

            context.Session["Usuario"] = null;

            Response.Redirect("~/Default.aspx");

        }

        
    }
}