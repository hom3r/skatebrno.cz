g = new jsnx.Graph()

k6 = jsnx.completeGraph(6)

console.log "Hello world"

console.log k6.nodes()

for edge in k6.edges()
    console.log edge


jsnx.draw k6, {
    element: '#canvas'
    edgeStyle: {
        'stroke-width': 10
    }
}
