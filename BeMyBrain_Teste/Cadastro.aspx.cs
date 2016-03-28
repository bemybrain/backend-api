using Entidades;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.Xml;
using System.Net.Http.Headers;

namespace BeMyBrain_Teste
{
    public partial class Cadastro : System.Web.UI.Page
    {
        System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
        Uri usuarioUri;

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected async void ImageButton1_Click(object sender, ImageClickEventArgs e)
        {
            client.BaseAddress = new Uri("http://localhost:2561");
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/xml"));

            var usuario = new Usuario()
            {
                Id = 2,
                Nome = txtNome.Text,
                Sobrenome = txtSobrenome.Text,
                Email = txtEmail.Text,
                Login = txtLogin.Text,
                Senha = txtSenha.Text,
                InstituicaoEnsino = txtInstituicaoEnsino.Text
            };


            ArrayOfUsuario au = new ArrayOfUsuario();

            au.Usuario.Add(usuario);
            //converte o xml string para XDocument


            var xmlSerializer = new System.Xml.Serialization.XmlSerializer(typeof(ArrayOfUsuario));
            Xml x = new Xml();
            string xmlUsuario = null;

            StreamWriter w = new StreamWriter(@"D:\MeusProjetos\BeMyBrain_Teste\BeMyBrain_Teste\XMLFile1.xml");

            xmlSerializer.Serialize(w, au);

            w.Flush();
            w.Dispose();
            XmlDocument xm = new XmlDocument();
            xm.Load(@"D:\MeusProjetos\BeMyBrain_Teste\BeMyBrain_Teste\XMLFile1.xml");

            //Stream s = new FileStream(@"D:\MeusProjetos\BeMyBrain_Teste\BeMyBrain_Teste\XMLFile1.xml", FileMode.Open, FileAccess.ReadWrite);

            HttpContent httpContent = new StringContent(xm.InnerXml);
            httpContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/xml");

            HttpResponseMessage response = await client.PostAsync("api/usuario/", httpContent);

            



            //var xDocument = XDocument.Parse(xmlUsuario);

            //System.Net.Http.HttpContent xml = obj.Serialize(xxx.CreateWriter(), usuario);

            //chamando a api pela url
            //System.Net.Http.HttpResponseMessage response = client.PostAsync("api/usuario/", obj).Result;

            //se retornar com sucesso busca os dados

            //pegando o cabeçalho


            //Pegando os dados do Rest e armazenando na variável usuários





            //Deserializa o XDocument


            //Usuario u = new Usuario();

            //foreach (var item in obj.Usuario)
            //{
            //    u.Nome = item.Nome;
            //}

            //Label1.Text = $"Bem vindo {u.Nome} !";

            //Label1.Visible = true;

            //Panel1.Visible = false;

            //btnLogout.Visible = true;

            //context.Session["Usuario"] = u.Nome;
        }
    }
}