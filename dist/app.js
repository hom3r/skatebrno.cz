(function() {
  var DRAW_SETTINGS, G, completeG, cyclicG, redraw;

  G = jsnx.cycleGraph(6);

  DRAW_SETTINGS = {
    element: '#canvas',
    edgeStyle: {
      'stroke-width': 10
    },
    layoutAttr: {
      linkDistance: 100
    },
    nodeAttr: {
      r: 5
    },
    nodeStyle: {
      stroke: 'none'
    },
    edgeStyle: {
      fill: '#999'
    }
  };

  redraw = function() {
    return jsnx.draw(G, DRAW_SETTINGS, true);
  };

  completeG = function(n) {
    G = jsnx.completeGraph(n);
    return redraw();
  };

  cyclicG = function(n) {
    G = jsnx.cycleGraph(n);
    return redraw();
  };

  completeG(5);

  $('#k1').click(function() {
    return completeG(1);
  });

  $('#k2').click(function() {
    return completeG(2);
  });

  $('#k3').click(function() {
    return completeG(3);
  });

  $('#k4').click(function() {
    return completeG(4);
  });

  $('#k5').click(function() {
    return completeG(5);
  });

  $('#k6').click(function() {
    return completeG(6);
  });

  $('#k7').click(function() {
    return completeG(7);
  });

  $('#k8').click(function() {
    return completeG(8);
  });

  $('#k9').click(function() {
    return completeG(9);
  });

  $('#k10').click(function() {
    return completeG(10);
  });

  $('#c1').click(function() {
    return cyclicG(1);
  });

  $('#c2').click(function() {
    return cyclicG(2);
  });

  $('#c3').click(function() {
    return cyclicG(3);
  });

  $('#c4').click(function() {
    return cyclicG(4);
  });

  $('#c5').click(function() {
    return cyclicG(5);
  });

  $('#c6').click(function() {
    return cyclicG(6);
  });

  $('#c7').click(function() {
    return cyclicG(7);
  });

  $('#c8').click(function() {
    return cyclicG(8);
  });

  $('#c9').click(function() {
    return cyclicG(9);
  });

  $('#c10').click(function() {
    return cyclicG(10);
  });

  $('.button').click(function(e) {
    return e.preventDefault();
  });

}).call(this);
