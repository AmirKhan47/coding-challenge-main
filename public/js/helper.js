function ajaxForm(formItems) {
    ///////////////////
    // console.log(formItems);
    // var form = new FormData();
    // formItems.forEach(formItem => {
    //     form.append(formItem[0], formItem[1]);
    // });
    // return form;
    //////////////////
    var form = new FormData();
    form.append('user_id1', formItems);
    return form;
}


/**
 *
 * @param {*} url route
 * @param {*} method POST or GET
 * @param {*} functionsOnSuccess Array of functions that should be called after ajax
 * @param {*} form for POST request
 */
function ajax(url, method, functionsOnSuccess, form, functiononSuccess=undefined) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    })

    if (typeof form === 'undefined') {
        form = new FormData;
    }

    // alert(typeof functionsOnSuccess);

    if (typeof functionsOnSuccess === 'undefined') {
        functionsOnSuccess = [];
    }

    if (functiononSuccess === 'Suggestions' || functiononSuccess === 'SentRequests' || functiononSuccess === 'ReceivedRequests' || functiononSuccess === 'Connections')
    {
        $('#connections_in_common_skeleton').removeClass('d-none');
    }

    $.ajax({
        url: url,
        type: method,
        async: true,
        data: form,
        processData: false,
        contentType: false,
        dataType: 'json',
        error: function (xhr, textStatus, error) {
            console.log(xhr.responseText);
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        success: function (response) {
            if (functiononSuccess === 'Suggestions' || functiononSuccess === 'SentRequests' || functiononSuccess === 'ReceivedRequests' || functiononSuccess === 'Connections')
            {
                $('#connections_in_common_skeleton').addClass('d-none');
            }

            // console.log(functionsOnSuccess.length);
            for (var j = 0; j < functionsOnSuccess.length; j++) {
                // console.log(functionsOnSuccess.length);
                // console.log(functionsOnSuccess);
                for (var i = 0; i < functionsOnSuccess[j][1].length; i++) {
                    // console.log(functionsOnSuccess);
                    if (functionsOnSuccess[j][1][i] == "response") {
                        functionsOnSuccess[j][1][i] = response;
                    }
                }
                functionsOnSuccess[j][0].apply(this, functionsOnSuccess[j][1]);
            }
            // console.log(response.length);
            // $('#suggestions_table').html(response[0]['id']);

            if (functiononSuccess === 'Suggestions')
            {
                $('#count_s').text(response.total);
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i]['id'];
                    var name = response.data[i]['name'];
                    var email = response.data[i]['email'];
                    // console.log(response[i]);
                    $('#suggestions').append('  <div class="d-flex justify-content-between my-1" id="sugesstion_id_' + id + '">\n' +
                        '    <table class="ms-1" id="suggestions_table">\n' +
                        '      <td class="align-middle">' + name + '</td>\n' +
                        '      <td class="align-middle"> - </td>\n' +
                        '      <td class="align-middle">' + email + '</td>\n' +
                        '      <td class="align-middle">\n' +
                        '    </table>\n' +
                        '    <div id="create_request_btns">\n' +
                        '      <button id="create_request_btn_" class="btn btn-primary me-1" onclick="sendRequest(' + id + ')">Connect</button>\n' +
                        '    </div>\n' +
                        '  </div>');
                }
                if (response.next_page_url != null) {
                    // alert('suggestions');
                    $('#suggestions').append('  <div class="d-flex justify-content-center w-100 py-2">\n' +
                        '    <button class="btn btn-sm btn-primary" onclick="getMoreRequests(\'' + response.next_page_url + '\', \'' + 'Suggestions' + '\')" id="load_more_suggestions_' + response.current_page + '">Load more</button>\n' +
                        '</div>');
                }
                // else
                // {
                //     alert('No more suggestions');
                // }
            }
            if (functiononSuccess === 'SentRequests')
            {
                $('#count_sr').text(response.total);
                // console.log(response.data.length);
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i]['id'];
                    var name = response.data[i]['name'];
                    var email = response.data[i]['email'];
                    // console.log(response[i]);
                    $('load_more_requests').hide();
                    $('#sent_requests').append('  <div class="d-flex justify-content-between my-1" id="sent_request_id_' + id + '">\n' +
                        '    <table class="ms-1" id="suggestions_table">\n' +
                        '      <td class="align-middle">' + name + '</td>\n' +
                        '      <td class="align-middle"> - </td>\n' +
                        '      <td class="align-middle">' + email + '</td>\n' +
                        '      <td class="align-middle">\n' +
                        '    </table>\n' +
                        '    <div id="cancel_request_btns">\n' +
                        '      <button id="cancel_request_btn_" class="btn btn-danger me-1" onclick="deleteRequest(\'' + id + '\',\'' + 'withdraw' + '\')">Withdraw Request</button>\n' +
                        '    </div>\n' +
                        '  </div>');
                }
                if (response.next_page_url != null) {
                    $('#sent_requests').append('  <div class="d-flex justify-content-center w-100 py-2">\n' +
                        '    <button class="btn btn-sm btn-primary" onclick="getMoreRequests(\'' + response.next_page_url + '\', \'' + 'SentRequests' + '\')" id="load_more_sent_requests_' + response.current_page + '">Load more</button>\n' +
                        '</div>');
                }
            }
            if (functiononSuccess === 'ReceivedRequests')
            {
                $('#count_rr').text(response.total);
                // alert('ReceivedRequests');
                // console.log(response.data.length);
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i]['id'];
                    var name = response.data[i]['name'];
                    var email = response.data[i]['email'];
                    // console.log(response);
                    $('#received_requests').append('  <div class="d-flex justify-content-between my-1" id="received_request_id_' + id + '">\n' +
                        '    <table class="ms-1" id="suggestions_table">\n' +
                        '      <td class="align-middle">' + name + '</td>\n' +
                        '      <td class="align-middle"> - </td>\n' +
                        '      <td class="align-middle">' + email + '</td>\n' +
                        '      <td class="align-middle">\n' +
                        '    </table>\n' +
                        '    <div id="accept_request_btns">\n' +
                        '      <button id="accept_request_btn_" class="btn btn-success me-1" onclick="acceptRequest(\'' + id + '\')">Accept Request</button>\n' +
                        '      <button id="reject_request_btn_" class="btn btn-danger me-1" onclick="deleteRequest(\'' + id + '\',\'' + 'reject' + '\')">Reject Request</button>\n' +
                        '    </div>\n' +
                        '  </div>');
                }
                // alert(response.next_page_url);
                if (response.next_page_url != null) {
                    $('#received_requests').append('  <div class="d-flex justify-content-center w-100 py-2">\n' +
                        '    <button class="btn btn-sm btn-primary" onclick="getMoreRequests(\'' + response.next_page_url + '\', \'' + 'ReceivedRequests' + '\')" id="load_more_received_requests_' + response.current_page + '">Load more</button>\n' +
                        '</div>');
                }
            }
            if (functiononSuccess === 'Connections')
            {
                $('#count_c').text(response.total);
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i]['id'];
                    var name = response.data[i]['name'];
                    var email = response.data[i]['email'];
                    // console.log(response[i]);
                    $('#connections').append('  <div class="d-flex justify-content-between my-1" id="connection_id_' + id + '">\n' +
                        '    <table class="ms-1" id="suggestions_table">\n' +
                        '      <td class="align-middle">' + name + '</td>\n' +
                        '      <td class="align-middle"> - </td>\n' +
                        '      <td class="align-middle">' + email + '</td>\n' +
                        '      <td class="align-middle">\n' +
                        '    </table>\n' +
                        '    <button style="width: 220px" onclick="getConnectionsInCommon(\'' + id + '\')" id="get_connections_in_common_' + id + '" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_' + id + '" aria-expanded="false" aria-controls="collapseExample">Connections in common (<span id="count_cic_'+id+'"></span>)</button>\n' +
                        '    <div id="disconnect_btns">\n' +
                        '      <button id="disconnect_btn_" class="btn btn-danger me-1" onclick="deleteRequest(\'' + id + '\',\'' + 'disconnect' + '\')">Remove Connection</button>\n' +
                        '    </div>\n' +
                        '  </div>\n' +
                        '  <div class="collapse" id="collapse_' + id + '">\n' +
                        '   <div id="connections_in_common_' + id + '" class="p-2">\n' +
                        '   </div>');
                }
                if (response.next_page_url != null) {
                    $('#connections').append('  <div class="d-flex justify-content-center w-100 py-2">\n' +
                        '    <button class="btn btn-sm btn-primary" onclick="getMoreRequests(\'' + response.next_page_url + '\', \'' + 'Connections' + '\')" id="load_more_connections_' + response.current_page + '">Load more</button>\n' +
                        '</div>');
                }
            }
            if (functiononSuccess === 'ConnectionsInCommon')
            {
                // alert('ConnectionsInCommon');
                // console.log(response.data.length);
                if (response.data.length == 0)
                {
                    var id = url.substring(url.lastIndexOf('/') + 1);
                    // var url = new URL(mode);
                    // var id = url.searchParams.get("page");
                    // id = id - 1;
                    // $('#connections_in_common_57').replaceWith( "<h2>No More Data.</h2>" );
                    // $('#connections_in_common_57').text('no data found');
                    $('#connections_in_common_'+id).html('');
                    $('#connections_in_common_'+id).append('  <div class="p-2 shadow rounded mt-2 text-white text-center bg-dark">No connections in common</div>');
                }
                var id = url.substring(url.lastIndexOf('/') + 1);
                id = id.split('?')[0];
                // console.log('before'+id);
                // alert(id);
                // let path = url.split('?')[0];
                // console.log(path);
                // console.log(response.total);
                // alert('before');
                $('#count_cic_'+id).text(response.total);
                // alert('after');
                // $('#connections_in_common_'+id).html('');
                for (var i = 0; i < response.data.length; i++)
                {
                    var id = response.data[i]['id'];
                    var name = response.data[i]['name'];
                    var email = response.data[i]['email'];
                    // console.log(response);
                    var id = url.substring(url.lastIndexOf('/') + 1);
                    id = id.split('?')[0];
                    // $('#connections_in_common_' + id).html('');
                    console.log(id);
                    $('#connections_in_common_'+id).append('  <div class="p-2 shadow rounded mt-2 text-white bg-dark">' + name + ' - ' + email + '</div>');
                }
                if (response.next_page_url != null)
                {
                    $('#connections_in_common_'+id).append('  <div class="d-flex justify-content-center w-100 py-2">\n' +
                        '    <button class="btn btn-sm btn-primary" onclick="getMoreRequests(\'' + response.next_page_url + '\', \'' + 'ConnectionsInCommon' + '\')" id="load_more_connections_in_common_' + response.current_page + '">Load more</button>\n' +
                        '</div>');
                }
            }
        }
    });

}


function exampleUseOfAjaxFunction(exampleVariable) {
    // show skeletons
    // hide content

    var form = ajaxForm([
        ['exampleVariable', exampleVariable],
    ]);

    var functionsOnSuccess = [
        [exampleOnSuccessFunction, [exampleVariable, 'response']]
    ];

    // POST
    ajax('/example_route', 'POST', functionsOnSuccess, form);

    // GET
    ajax('/example_route/' + exampleVariable, 'GET', functionsOnSuccess);
}

function exampleOnSuccessFunction(exampleVariable, response) {
    // hide skeletons
    // show content

    console.log(exampleVariable);
    console.table(response);
    $('#content').html(response['content']);
}
