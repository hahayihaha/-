function haha()
{
  $(".img").each(function () {
    console.log($(this).attr("src"));
    const w = $(this).width();
    const h = $(this).height();
    if(w > h)
    {
      $(this).attr("width",'100%');
    }else
    {
      $(this).attr("height",'100%');
    }
  });
}

