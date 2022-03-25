document.getElementById('Piechart-cntnr').style.display='none';
document.getElementById('PointChart-cntnr').style.display='none';
function togglePages(id){
    const pages=['Barchart-cntnr', 'Piechart-cntnr', 'PointChart-cntnr'];
    for(var i=0; i<pages.length;i++){
        if(pages[i] == id){
            if(document.getElementById(pages[i]).style.display=='none'){
                document.getElementById(pages[i]).style.display='block';
            }
        }else{
            document.getElementById(pages[i]).style.display = 'none';
        }
    }
}
