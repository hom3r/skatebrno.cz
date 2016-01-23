(function() {
  var edge, g, i, k6, len, ref;

  g = new jsnx.Graph();

  k6 = jsnx.completeGraph(6);

  console.log("Hello world");

  console.log(k6.nodes());

  ref = k6.edges();
  for (i = 0, len = ref.length; i < len; i++) {
    edge = ref[i];
    console.log(edge);
  }

  jsnx.draw(k6, {
    element: '#canvas',
    edgeStyle: {
      'stroke-width': 10
    }
  });

}).call(this);
