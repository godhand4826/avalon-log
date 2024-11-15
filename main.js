(function () {
  let results = [];
  for (let r = 1; r <= 5; r++) {
    const roundTab = $(`#round_${r}`);
    if (!roundTab.length) break;
    roundTab
      .find("tr")
      .slice(1)
      .each(function () {
        var team = [];
        var outerWhite = [];
        var innerBlack = [];
        $(this)
          .find("td[style]")
          .each(function (i) {
            const player = (i + 1) % 10;

            if ($(this).find("img").length) {
              team.push(player);
            }

            const vote = $(this).find("span").text().trim();
            if (!vote.startsWith("正常")) {
              if (vote.endsWith("白")) {
                outerWhite.push(player);
              } else {
                innerBlack.push(player);
              }
            }
          });
        results.push([team, outerWhite, innerBlack]);
      });

    let mission = [];
    roundTab.find("img").each(function () {
      if ($(this).attr("src").includes("good_cup")) mission.push(true);
      if ($(this).attr("src").includes("bad_cup")) mission.push(false);
    });
    results.at(-1).push(mission);
  }
  var output = results
    .map(([team, ow, ib, m]) => {
      let chunk = [team.join("")];
      if (ow.length) chunk.push(`+${ow.join("")}`);
      if (ib.length) chunk.push(`-${ib.join("")}`);
      if (m?.length)
        chunk.push(m.map((success) => (success ? "O" : "X")).join(""));
      return chunk.join(" ");
    })
    .join("\n");

  console.log(output);
  copy(output);
})();
