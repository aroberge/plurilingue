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
      '<td><textarea id="textarea-{idx}" rows="{rows}" cols="80"> </textarea></td>' +
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

function update_new(data){
    $.each(data, function(idx, elem){
        elem = elem.replace(/\\n/g, "\n");
        var area = document.getElementById("textarea-" + idx);
        area.value = elem;
    });
}

function save_json() {
    // Loop through grabbing everything
    var area, blob, content, cells, json_obj = {};
    $("tbody tr").each(function(index){
        idx = $(this).attr("id");
        var area = document.getElementById("textarea-" + idx);
        content = area.value;
        json_obj[idx] = content.replace(/\n/g, "\\n");
    });
    blob = new Blob([JSON.stringify(json_obj, null, '  ')], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "filename.json", true);
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

    $("#select-new").change(function() {
        if (!$(this).val()){
            return;
        }
        $.ajax({url: $(this).val(),
            dataType: 'json',
            error: function(e){
                alert("error");
            },
            success: function(data){
                update_new(data);
            }
        });
    });
});
