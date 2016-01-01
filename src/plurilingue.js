// adapted from http://javascript.crockford.com/remedial.html
String.prototype.supplant = function (o) {
    return this.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

function update_reference(data){
    var tbody = $('tbody');
    var row = '<tr id={idx}>' +
      '<td>{idx}</td>' +
      '<td><textarea rows="{rows}" cols="80" readonly>{elem}</textarea></td>' +
      '<td><textarea rows="{rows}" cols="80">{elem}</textarea></td>' +
      '</tr>';
    tbody.html('');
    $.each(data, function(idx, elem){
        var rows = (elem.match(/\\n/g) || []).length + 1;
        elem = elem.replace(/\\n/g, "\n");
        tbody.append(row.supplant({
            'idx':idx,
            'elem': elem,
            'rows': rows
        }));
    });
}


$(document).ready(function() {
    $("#select-reference").change(function() {
        if (!$(this).val()){
            return;
        }
        $.ajax({url: $(this).val(),
            dataType: 'json',
            error: function(e){
                alert("error");
            },
            success: function(data){
                update_reference(data);
            }
        });
    });
});
