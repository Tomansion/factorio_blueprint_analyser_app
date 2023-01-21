<template>
  <div
    id="infoText"
    class="pannel"
  >

    <h1>Factorio blueprint analyser</h1>

    <div id="content">
      <div class="list">
        The Factorio blueprint analyser is a tool to help you find the bottleneck in a supplychain.<br>
        <br>
        This Web application was made to demonstrate the <a
          href="https://github.com/Tomansion/factorio_blueprint_analyser"
          target="_blank"
        >Factorio blueprint analyser algorithm</a> that was created for AI assisted base building purpose.<br>

      </div>
      <h2>Features </h2>

      <div class="list">
        <ul>
          <li>Estimate the blueprint item input:</li>
          <ul>
            <li>Item list</li>
            <li>Quantity per second</li>
            <li>Entrance location on the blueprint</li>
          </ul>
          <li>Estimate the blueprint item output:</li>
          <ul>
            <li>Item list</li>
            <li>Quantity per second</li>
            <li>Exit location on the blueprint</li>
          </ul>
          <li>Estimate the usage of each entities (inserters, belts, assembly machines, ...)</li>
          <ul>
            <li>Transported / produced items for each entities</li>
            <li>Usage of the entity in percentage</li>
            <li>Bottleneck identification</li>
          </ul>
          <li>Json results export</li>
        </ul>
      </div>

      <h2>How to use this application </h2>
      <div class="list">
        Begin by pasting your blueprint in the text area or upload your blueprint file.<br>
        Then click on the "Analyse" button.<br>
        The aglogirth results will be displayed on a new page.<br>
        <br>
        You can also select one of the example blueprint to test the application.<br>
      </div>

      <h2>Limitations</h2>
      <div class="list">
        Some entities and features are not supported by the algorithm yet:
        <ul>
          <li>Furnaces</li>
          <li>Science lab</li>
          <li>Beacons</li>
          <li>Modules</li>
        </ul>

        The tool is still in development, so please report any bugs by creating an issue
        <a href="https://github.com/tomansion/factorio_blueprint_analyser_app/issues">here</a><br>
      </div>

      <h2>More on the project</h2>
      <div class="list">
        This project is part of an internship at the <b>Michigan State University</b> for the <b>Factorio Must Grow
          project</b>. <br>
        <br><b>Help us beat Factorio with algorithms!</b><br><br>

        To know more about the project:
        <ul>
          <li>Watch my intership final presentation on
            <a href="https://youtu.be/q2Bx-8wbsvk?t=2162">Youtube</a>
          </li>
          <li>Watch The Factory Must Grow: Automation in Factorio presentation on
            <a href="https://www.youtube.com/watch?v=9ie01GLGB5s">Youtube</a>
          </li>
          <li>
            Join the AI in Factorio
            <a href="https://join.slack.com/t/aiinfactorio/shared_invite/zt-1i93131b5-~qucCV~PYmrj8VP5m4RGFQ">Slack channel</a>
            <br>
          </li>
          <li>Contact <a href="mailto:reidken1@msu.edu">reidken1@msu.edu</a></li>
        </ul>
      </div>

      <h2>Credits</h2>
      <p class="list">
        Creator of the Factorio blueprint analyser algorithm and app: <a
          href="https://tomansion.fr"
          target="_blank"
        >Tom Mansion</a><br>
        <br>
        Huge thanks to <a href="https://www.kenreid.co.uk/research.html">Ken. Reid</a> for making this internship possible.<br>

        Thanks to <a href="https://graphiste.com/MaureenBx">MaureenBx</a> for helping me with the design.<br>

        Images from the <a
          href="https://wiki.factorio.com/index.php?title=Category:Game_images&fileuntil=Satellite.png#mw-category-media"
        >Factorio Wiki</a>.
      </p>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
#infoText {
  display: flex;
  flex-direction: column;
}

#content {
  overflow: auto;
}

.list {
  display: block;
  margin-bottom: 20px;
  padding: 15px;
}
</style>