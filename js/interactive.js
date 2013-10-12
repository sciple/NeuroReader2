$(document).ready(function(){


    function scrollUP(){
        $('html, body').animate({
            scrollTop: $("#wrapper").offset().top
        }, 750);
    }

    var descLength = 250;
    var maxFeed = 50;
    var typeofQuery=false;

    var journals = [
        { "url":"http://www.jneurosci.org/rss/current.xml" , "journalName":"J Neuroscience", "weight":"1","cover":"http://www.jneurosci.org/content/33/41.cover.gif"},
        { "url":"http://feeds.nature.com/neuro/rss/current" , "journalName":"Nature Neuroscience", "weight":"1","cover":"http://www.nature.com/neuro/journal/v16/n10/images/homecover.gif"},
        { "url":"http://www.cell.com/rssFeed/neuron/rss.NewIssueAndArticles.xml" , "journalName":"Neuron", "weight":"1","cover":"http://download.cell.com/images/journalimages/0896-6273/S0896627313X00200_cov150h.gif"},
        { "url":"http://learnmem.cshlp.org/rss/current.xml" , "journalName":"Learning & Memory", "weight":"1","cover":"http://learnmem.cshlp.org/content/20/10.cover.gif"},
        { "url":"http://onlinelibrary.wiley.com/rss/journal/10.1002/(ISSN)1098-1063" , "journalName":"Hippocampus", "weight":"1","cover":"http://onlinelibrary.wiley.com/store/10.1002/pola.v23.10/asset/cover.gif?v=1&s=12c1575fbf61d3c7c3e21a7910719f6466e3da43"},
        { "url":"http://feeds.feedburner.com/pnas/SMZM" , "journalName":"PNAS", "weight":"1","cover":"http://www.pnas.org/content/110/41.cover.gif"},
        { "url":"http://feeds.nature.com/nature/rss/current" , "journalName":"Nature", "weight":"1","cover":"http://www.nature.com/nature/journal/v502/n7470/images/cover_nature.jpg"},
        { "url":"http://feeds.nature.com/NatureLatestResearch" , "journalName":"Nature Latest", "weight":"1","cover":"http://www.nature.com/nature/journal/v502/n7470/images/cover_nature.jpg"},
        { "url":"http://www.nature.com/ncomms/newsfeeds.html" , "journalName":"Nature Communications", "weight":"1","cover":"images/icon.png"},
        { "url":"http://www.cell.com/rssFeed/neurosciences/rss.NewArticles.xml" , "journalName":"TINS", "weight":"1","cover":"http://download.cell.com/images/journalimages/0166-2236/S0166223613X00098_cov150h.gif"},
        { "url":"http://elife.elifesciences.org/rss/recent.xml" , "journalName":"eLife", "weight":"1","cover":"http://www.elifesciences.org/wp-content/themes/elife-master/images/footer-logo.png"},
        { "url":"http://rss.sciencedirect.com/publication/science/03064522" , "journalName":"Neuroscience", "weight":"1","cover":"http://ars.els-cdn.com/content/image/S03064522.gif"},
        { "url":"http://rss.sciencedirect.com/publication/science/10747427" , "journalName":"NLM", "weight":"1","cover":"http://cdn.elsevier.com/cover_img/622924.gif"},
        { "url":"http://cercor.oxfordjournals.org/rss/ahead.xml" , "journalName":"Cerebral Cortex", "weight":"1","cover":"http://cercor.oxfordjournals.org/content/23/11.cover.gif"},
        { "url":"http://link.springer.com/search.rss?facet-content-type=Article&facet-journal-id=12021&channel-name=Neuroinformatics_title" , "journalName":"Neuroinformatics", "weight":"1","cover":"http://images.springer.com/cda/content/image/cda_displayimage.jpg?SGWID=0-0-16-310032-0"},
        { "url":"http://feeds.nature.com/nprot/rss/current" , "journalName":"Nature protocols", "weight":"1","cover":"http://www.nature.com/nprot/images/homepage/journalcover_v8_n11.gif"},
        { "url":"http://www.cell.com/rssFeed/neuron/rss.NewIssueAndArticles.xml" , "journalName":"TICS", "weight":"1","cover":"http://download.cell.com/images/journalimages/1364-6613/S1364661313X00105_cov150h.gif"},
        { "url":"http://www.sciencemag.org/rss/current.xml" , "journalName":"Science", "weight":"1","cover":"http://www.sciencemag.org/content/342/6155/F1.medium.gif"},
        { "url":"http://onlinelibrary.wiley.com/rss/journal/10.1111/%28ISSN%291460-9568" , "journalName":"EJN", "weight":"1","cover":"http://onlinelibrary.wiley.com/store/10.1111/ejn.2013.38.issue-7/asset/cover.gif?v=1&s=651a6aabe18d3a92fab0f08726bcbae3f42023d8"},
        { "url":"http://feeds.plos.org/ploscompbiol/NewArticles?startPage=0&filterAuthors=&filterArticleType=&pageSize=12&filterKeyword=&filterStartDate=2013-03-19T00%253A00%253A00Z&filterJournals=PLoSCompBiol&sort=Date%252C+newest+first&query=&ELocationId=&id=&resultView=&filterEndDate=2013-04-18T23%253A59%253A59Z&unformattedQuery=*%253A*&filterSubjects=&volume=&" , "journalName":"PLOS Computational Biology", "weight":"1","cover":"http://www.ploscompbiol.org/images/logo.png"},
        { "url":"http://www.plosone.org/article/feed/search?startPage=0&filterAuthors=&filterArticleType=&pageSize=12&filterKeyword=&filterStartDate=2013-03-19T00%3A00%3A00Z&filterJournals=PLoSONE&sort=Date%2C+newest+first&query=&ELocationId=&id=&resultView=&filterEndDate=2013-04-18T23%3A59%3A59Z&unformattedQuery=*%3A*&filterSubjects=&volume=&" , "journalName":"PLOS one", "weight":"1","cover":"http://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/PLOS_ONE_logo_2012.svg/300px-PLOS_ONE_logo_2012.svg.png"},
        { "url":"http://www.cell.com/rssFeed/Cell/rss.NewIssueAndArticles.xml" , "journalName":"Cell", "weight":"1","cover":"http://download.cell.com/images/journalimages/0092-8674/S0092867413X00212_cov150h.gif"},
        { "url":"http://rss.sciencedirect.com/publication/science/10538119" , "journalName":"Neuroimage", "weight":"1","cover":"http://cdn.elsevier.com/cover_img/622925.gif"},
        { "url":"http://rss.sciencedirect.com/publication/science/00283932" , "journalName":"Neuropsychologia", "weight":"1","cover":"http://cdn.elsevier.com/cover_img/247.gif"},
        { "url":"http://rss.sciencedirect.com/publication/science/09594388" , "journalName":"Current Opinion in Neurobiology", "weight":"1","cover":"http://ars.els-cdn.com/content/image/S09594388.gif"},
        { "url":"http://feeds.feedburner.com/ResearchBloggingAllEnglish" , "journalName":"Research Blogging", "weight":"1","cover":"http://researchblogging.com/public/img/seedMediaGroup.gif"}
    ];




    // Read the keywords file
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        // Loop through the FileList
        for (var i = 0, f; f = files[i]; i++) {
          var reader = new FileReader();
          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
               queryMe = e.target.result;
               $("#txtQuery").val(e.target.result).focus();
               $("#queryFeed").trigger("click");
            };
          })(f);
          // Read in the file
          reader.readAsText(f,"UTF-8");
        }  
    }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);


	$("#queryFeed").click(function () {
        
        // scroll page to top
        scrollUP();
        
        // to do: add sanitize input
        var inputQuery = $('#txtQuery').val();
        var query = inputQuery.split(",");

        // activate boolean search on first list item
        if (query[0].toLowerCase().indexOf("boolean")>-1){
            typeofQuery=true;
        }
        
        //remove containers from previous search result
        $(".container").remove();
        
        //generate containers to fill with feeds
        for (var i = 0; i < journals.length; i++) {
            $("#wrapper").append('<div id="divRss'+i+'" class="container"></div>');
         };

         // fill containers with the feeds
        for (var i = 0; i < journals.length; i++) {

            $('#divRss'+i+'').FeedEk({
                FeedUrl : journals[i].url,
                MaxCount : maxFeed,
                ShowDesc : true,
                ShowPubDate:true,
                DescCharacterLimit:descLength,
                TitleLinkTarget:'_blank'
                },query,journals[i].journalName, typeofQuery, journals[i].cover);
        };
    });
});