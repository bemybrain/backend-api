<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="BeMyBrain_Teste.WebForm1" %>

<%@ Register Src="~/LoginUC.ascx" TagPrefix="uc1" TagName="LoginUC" %>


<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    
    <div class="jumbotron">
        <uc1:LoginUC runat="server" ID="LoginUC" />
    </div>
</asp:Content>
