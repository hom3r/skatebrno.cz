G = jsnx.cycleGraph(6)

DRAW_SETTINGS = {
    element: '#canvas'
    edgeStyle: {
        'stroke-width': 10
    }
    layoutAttr: {
        linkDistance: 100
    }
    nodeAttr: {
        r: 5
    }
    nodeStyle: {
        stroke: 'none'
    }
    edgeStyle: {
        fill: '#999'
    }
}

redraw = () ->
    jsnx.draw G, DRAW_SETTINGS, true

completeG = (n) ->
    G = jsnx.completeGraph n
    redraw()

cyclicG = (n) ->
    G = jsnx.cycleGraph n
    redraw()

completeG(5)


# Complete graphs
$('#k1').click ->
    completeG(1)
$('#k2').click ->
    completeG(2)
$('#k3').click ->
    completeG(3)
$('#k4').click ->
    completeG(4)
$('#k5').click ->
    completeG(5)
$('#k6').click ->
    completeG(6)
$('#k7').click ->
    completeG(7)
$('#k8').click ->
    completeG(8)
$('#k9').click ->
    completeG(9)
$('#k10').click ->
    completeG(10)
$('#k11').click ->
    completeG(11)
$('#k12').click ->
    completeG(12)

# Cyclic graphs
$('#c1').click ->
    cyclicG(1)
$('#c2').click ->
    cyclicG(2)
$('#c3').click ->
    cyclicG(3)
$('#c4').click ->
    cyclicG(4)
$('#c5').click ->
    cyclicG(5)
$('#c6').click ->
    cyclicG(6)
$('#c7').click ->
    cyclicG(7)
$('#c8').click ->
    cyclicG(8)
$('#c9').click ->
    cyclicG(9)
$('#c10').click ->
    cyclicG(10)
$('#c11').click ->
    cyclicG(11)
$('#c12').click ->
    cyclicG(12)


$('.button').click (e) ->
    e.preventDefault()
