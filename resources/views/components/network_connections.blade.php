<div class="row justify-content-center mt-5">
  <div class="col-12">
    <div class="card shadow  text-white bg-dark">
      <div class="card-header">Coding Challenge - Network connections</div>
      <div class="card-body">
        <div class="btn-group w-100 mb-3" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="btnradio1" id="get_suggestions_btn">Suggestions (<span id="count_s"></span>)</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onclick="getRequests()">
          <label class="btn btn-outline-primary" for="btnradio2" id="get_sent_requests_btn">Sent Requests (<span id="count_sr"></span>)</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
          <label class="btn btn-outline-primary" for="btnradio3" id="get_received_requests_btn">Received
            Requests(<span id="count_rr"></span>)</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off">
          <label class="btn btn-outline-primary" for="btnradio4" id="get_connections_btn">Connections (<span id="count_c"></span>)</label>
        </div>
        <hr>
        <div id="content" class="d-none">
          {{-- Display data here --}}
        </div>

        {{-- Remove this when you start working, just to show you the different components --}}
        <span class="fw-bold" id="sr_tab" style="display: none;">Sent Request Blade
        <x-request :mode="'sent'" />
        </span>
{{--          <hr>--}}
        <span class="fw-bold" id="rr_tab" style="display: none;">Received Request Blade
{{--        <x-request :mode="'received'" />--}}
        <x-r_request :mode="'received'" />
        </span>
{{--          <hr>--}}
        <span class="fw-bold" id="s_tab">Suggestion Blade
        <x-suggestion />
        </span>
{{--          <hr>--}}
        <span class="fw-bold" id="c_tab" style="display: none;">Connection Blade
        <x-connection />
        </span>
        {{-- Remove this when you start working, just to show you the different components --}}
{{--          <hr>--}}
        <div id="skeleton" class="d-none">
          @for ($i = 0; $i < 10; $i++)
            <x-skeleton />
          @endfor
        </div>

{{--        <span class="fw-bold">"Load more"-Button</span>--}}
{{--        <div class="d-flex justify-content-center mt-2 py-3 --}}{{-- d-none --}}{{--" id="load_more_btn_parent">--}}
{{--          <button class="btn btn-primary" onclick="" id="load_more_btn">Load more</button>--}}
{{--        </div>--}}
      </div>
    </div>
  </div>
</div>

{{-- Remove this when you start working, just to show you the different components --}}

<div id="connections_in_common_skeleton" class="d-none">
{{--  <br>--}}
{{--  <span class="fw-bold text-white">Loading Skeletons</span>--}}
  <div class="px-2">
    @for ($i = 0; $i < 10; $i++)
      <x-skeleton />
    @endfor
  </div>
</div>
