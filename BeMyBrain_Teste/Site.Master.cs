using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BeMyBrain_Teste
{
    public partial class SiteMaster : MasterPage
    {
        HttpContext context = HttpContext.Current;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (!string.IsNullOrEmpty((string)context.Session["Usuario"]))
                {
                    Label1.Text = $"Bem vindo {(string)context.Session["Usuario"]} !";

                    Label1.Visible = true;

                    HyperLink2.Visible = false;
                }
            }
        }
    }
}