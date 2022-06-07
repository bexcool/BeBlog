<fluent-border style="max-width: 100%; margin-right: 5em; padding-left: 2em; padding-top: 0;">
    <div style="display: inline;">
        <h2><?php echo $article['title']; ?></h2>
        <fluent-label><?php echo date("G:i d.m.Y", strtotime($article["creationDate"])); ?></fluent-label><fluent-hyperlink style="margin-left: 2em;" <?="href='./userProfile.php?user={$article["userID"]}'"?>><?php echo findAccountByID($db, $article["userID"])["username"]; ?></fluent-hyperlink>
        <fluent-hyperlink style='padding: 0.2em 0.2em 0 0.2em; margin-left: 3em;' onclick="likeArticle('<?php echo $article['ID']?>')"><fluent-icon style='margin: 0;' <?php echo (getArticleUserLikes($db, $article["ID"], $_SESSION["user"]["ID"]) > 0 ? "icon='heart_20_filled'" : "icon='heart_20_regular'")?>></fluent-icon></fluent-hyperlink><p id="like<?php echo $article["ID"]?>" style='display: inline-block; margin: 0 0 0 0.5em;'><?php echo count(getArticleLikes($db, $article["ID"]))?></p>
    </div>
    <div id="content<?php echo $article["ID"]?>" style="margin-top: 2em;"></div>
    <script>
        // Add article's content
        document.getElementById('content<?php echo $article["ID"]?>').innerHTML = marked.parse("<?php echo str_replace(array("\n","\r","\r\n"),'\n',$article['content']) ?>");
        // Make compatible with Fluent
        contentHTML = document.getElementById('content<?php echo $article["ID"]?>').innerHTML;
        contentHTML = contentHTML.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<fluent-hyperlink href="$1" target="_blank">$2</fluent-hyperlink>');
        
        document.getElementById('content<?php echo $article["ID"]?>').innerHTML = contentHTML;
    </script>
</fluent-border>