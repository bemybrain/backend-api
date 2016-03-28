<%@ Page Async="true"  Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Cadastro.aspx.cs" Inherits="BeMyBrain_Teste.Cadastro" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">


    <div class="jumbotron">
        <h1><b><i>Cadastre-se</i></b></h1>
        <br />
        <asp:TextBox ID="txtId" runat="server" Width="294px" ReadOnly="true" Visible="false"></asp:TextBox><br />

        <asp:Image ID="Image1" runat="server" ImageUrl="~/Images/png/512/person.png" Width="33px" Height="33px"/><asp:Label ID="Label1" runat="server" Text="Nome: " Font-Italic="true" Font-Bold="true"></asp:Label>
        <asp:TextBox ID="txtNome" runat="server" Width="294px" Height="33px"></asp:TextBox><br />
        <br />
        <asp:Image ID="Image2" runat="server" ImageUrl="~/Images/png/512/pricetag.png" Width="33px" Height="33px" /><asp:Label ID="Label2" runat="server" Text="Sobrenome: " Font-Italic="true" Font-Bold="true"></asp:Label>
        <asp:TextBox ID="txtSobrenome" runat="server" Width="294px"></asp:TextBox><br />
        <br />
        <asp:Image ID="Image3" runat="server" ImageUrl="~/Images/png/512/email.png" Width="33px" Height="33px" /><asp:Label ID="Label3" runat="server" Text="E-Mail: " Font-Italic="true" Font-Bold="true"></asp:Label>
        <asp:TextBox ID="txtEmail" runat="server" Width="294px"></asp:TextBox><br />
        <br />
        <asp:Image ID="Image4" runat="server" ImageUrl="~/Images/png/512/key.png" Width="33px" Height="33px"/><asp:Label ID="Label5" runat="server" Text="Login: " Font-Italic="true" Font-Bold="true"></asp:Label>
        <asp:TextBox ID="txtLogin" runat="server" Width="294px"></asp:TextBox><br />
        <br />
        <asp:Image ID="Image5" runat="server" ImageUrl="~/Images/png/512/locked.png" Width="33px" Height="33px"/><asp:Label ID="Label6" runat="server" Text="Senha: " Font-Italic="true" Font-Bold="true"></asp:Label>
        <asp:TextBox ID="txtSenha" runat="server" Width="294px" TextMode="Password"></asp:TextBox><br />
        <br />
        <asp:Image ID="Image6" runat="server" ImageUrl="~/Images/png/512/university.png" Width="33px" Height="33px"/><asp:Label ID="Label4" runat="server" Text="Instituição de Ensino: " Font-Italic="true" Font-Bold="true"></asp:Label>
        <asp:TextBox ID="txtInstituicaoEnsino" runat="server" Width="294px"></asp:TextBox><br />
        <br />
        <asp:ImageButton ID="ImageButton1" runat="server" ImageUrl="~/Images/png/512/person-add.png" Height="49px" Width="49px" OnClick="ImageButton1_Click"/>
    </div>
</asp:Content>
