<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BeMyBrain_Teste._Default" %>

<%@ Register Src="~/LoginUC.ascx" TagPrefix="uc1" TagName="LoginUC" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="jumbotron">
        <h1><b>Be My Brain</b></h1>
        <p class="lead">Be My Brain é um aplicativo muito interessante, cheio de suspense e aventura, no qual cada clique pode fazer um nada diferente.</p>
        <p><a href="http://www.asp.net" class="btn btn-primary btn-lg">Leia mais &raquo;</a></p>
    </div>

    <div class="row">

        <uc1:LoginUC runat="server" id="LoginUC" />

        <div class="col-md-4">
            <h2>Tire Suas Dúvidas</h2>
            <p>
                Através do nosso imaginário sistema de fórum tire suas dúvidas. Basicamente um Yahoo Respostas melhorado e menos divertido.
            </p>
            <p>
                <a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301949">Leia mais &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>Envie Perguntas</h2>
            <p>
                Se vira ai. Envie suas perguntas pelo nosso sistema ainda não pronto que é para Agosto. Aguarde... sentado.
            </p>
            <p>
                <a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301950">Leia mais &raquo;</a>
            </p>
        </div>
    </div>

</asp:Content>
