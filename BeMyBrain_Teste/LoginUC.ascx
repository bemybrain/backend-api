<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LoginUC.ascx.cs" Inherits="BeMyBrain_Teste.LoginUC" %>
<div class="col-md-4">

   
    <asp:Panel ID="Panel1" runat="server" Visible="true" style="margin-left:20px">
        <h2><b><i><img src="Images/png/512/log-in.png" style="width: 29px; height: 31px;" />Login</i></b></h2>
        
        <br />
        <asp:TextBox ID="txtLogin" runat="server" Width="294px"></asp:TextBox><br />
        <br />
        <asp:TextBox ID="txtSenha" runat="server" Width="294px" TextMode="Password"></asp:TextBox><br />
        <br />
         <asp:Button ID="btnLogin" runat="server" Text="Login" OnClick="btnLogin_Click" Width="75px"/>
         <small><i>&nbsp;&nbsp;&nbsp;&nbsp; Ainda não possui cadastro ?</i> <a href="Cadastro.aspx">&raquo;Clique aqui</a></small>
    </asp:Panel>
     <h2><b><asp:Label ID="Label1" runat="server" Text="" Visible="false"></asp:Label></b></h2>
     <asp:Button ID="btnLogout" runat="server" Text="Desconectar" OnClick="btnLogout_Click" Visible="false" />
     
        
</div>

