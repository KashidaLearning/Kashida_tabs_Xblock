function initTabsXBlockStudio(runtime, element, data) {

    if (window.jQuery && element instanceof window.jQuery) {
        element = element[0];
    }
    (function(){
        function killMasks() {
            document.querySelectorAll('.pgn__modal-backdrop, .modal-backdrop, .pgn__page-mask')
            .forEach(el => el.remove());
        }
        killMasks();
        const obs = new MutationObserver(killMasks);
        if (document && document.body) {
            obs.observe(document.body, {childList: true, subtree: true});
        }
    })();

    const xblockUid = data.xblock_uid;
    const tabCountInput = element.querySelector('[name="tab_count"]');
    const tabFieldsDiv = element.querySelector('#tabs-xblock-tab-fields');
    const previewDiv = element.querySelector(`#tabs-xblock-preview-${xblockUid}`);
    const bgInput = element.querySelector('[name="background_color"]');
    const tabFontSizeInput = element.querySelector('[name="tab_font_size"]');
    const tabFontColorInput = element.querySelector('[name="tab_font_color"]');
    const iconInput = element.querySelector('[name="icon_image_url"]');
    const introInput = element.querySelector('[name="intro_text"]');
    const tabPaddingInput = element.querySelector('[name="tab_padding"]');
    const instructionPaddingInput = element.querySelector('[name="instruction_padding"]');
    const mainboxPaddingInput = element.querySelector('[name="mainbox_padding"]');
    const tablinkPaddingInput = element.querySelector('[name="tablink_padding"]');
    const orientationInput = element.querySelector('[name="orientation"]');
    const tabButtonWidthInput = element.querySelector('[name="tab_button_width"]');
    const textDirectionInput = element.querySelector('[name="text_direction"]');
    const iconWidthInput = element.querySelector('[name="icon_width"]');
    const iconHeightInput = element.querySelector('[name="icon_height"]');
    const introFontColorInput = element.querySelector('[name="intro_font_color"]');
    const introFontSizeInput = element.querySelector('[name="intro_font_size"]');
    const introPaddingLeftInput = element.querySelector('[name="intro_padding_left"]');
    const predefinedStyleInput = element.querySelector('[name="predefined_style"]');
    const predefinedStyleDesc = document.getElementById('predefined-style-desc');
    const tabBgColorInput = element.querySelector('[name="tab_bg_color"]');
    const tabBorderColorInput = element.querySelector('[name="tab_border_color"]');
    const tabBorderWidthInput = element.querySelector('[name="tab_border_width"]');
    const tabBorderStyleInput = element.querySelector('[name="tab_border_style"]');
    const tabBorderRadiusInput = element.querySelector('[name="tab_border_radius"]');
    const activeTabColorInput = element.querySelector('[name="active_tab_color"]');
    const activeTabFontColorInput = element.querySelector('[name="active_tab_font_color"]');
    const activeTabBorderStyleInput = element.querySelector('[name="active_tab_border_style"]');
    const underlineColorInput = element.querySelector('[name="underline_color"]');
    const underlineColorSection = element.querySelector('#underline-color-section');
    const activeTabNoBorderInput = element.querySelector('[name="active_tab_no_border"]');

    const padTopInput = element.querySelector('[name="tab_button_padding_top"]');
    const padRightInput = element.querySelector('[name="tab_button_padding_right"]');
    const padBottomInput = element.querySelector('[name="tab_button_padding_bottom"]');
    const padLeftInput = element.querySelector('[name="tab_button_padding_left"]');
    const tabGapInput = element.querySelector('[name="tab_gap"]');

    let tabsData = data.tabs_content || [];
    let tabCount = parseInt(tabCountInput.value, 10) || tabsData.length || 1;

    function updateUnderlineColorField() {
        if (activeTabBorderStyleInput && underlineColorSection) {
            if (activeTabBorderStyleInput.value === "underline") {
                underlineColorSection.style.display = "block";
            } else {
                underlineColorSection.style.display = "none";
            }
        }
    }
    if (activeTabBorderStyleInput) {
        activeTabBorderStyleInput.addEventListener('change', updateUnderlineColorField);
        orientationInput.addEventListener('change', updateUnderlineColorField);
        updateUnderlineColorField();
    }

    function buildButtonPadding() {
        const pt = padTopInput?.value?.trim();
        const pr = padRightInput?.value?.trim();
        const pb = padBottomInput?.value?.trim();
        const pl = padLeftInput?.value?.trim();
        if (pt || pr || pb || pl) {
            return `${pt || '0'} ${pr || '0'} ${pb || '0'} ${pl || '0'}`;
        }
        return tablinkPaddingInput?.value || "10px 18px";
    }

    function renderPreview() {
        const introFontColor = introFontColorInput?.value || "#000000";
        const introFontSize = introFontSizeInput?.value || "16";
        const introPaddingLeft = introPaddingLeftInput?.value || "0px";
        const bg = bgInput?.value || "#fff8f3";
        const tabFontSize = tabFontSizeInput?.value || "16";
        const tabFontColor = tabFontColorInput?.value || "#6b6b6b";
        const icon = iconInput?.value || "";
        const iconW = iconWidthInput?.value || "48px";
        const iconH = iconHeightInput?.value || "48px";
        const intro = introInput?.value || "";
        const tabPadding = tabPaddingInput?.value || "30px 30px 18px 30px";
        const instructionPadding = instructionPaddingInput?.value || "10px 15px";
        const mainboxPadding = mainboxPaddingInput?.value || "20px 0px";
        const tablinkPadding = buildButtonPadding();
        const orientation = orientationInput?.value || "vertical";
        const tabButtonWidth = tabButtonWidthInput?.value || "195px";
        const textDirection = textDirectionInput?.value || "ltr";
        const rtlClass = textDirection === "rtl" ? "rtl" : "";

        const tabBgColor = tabBgColorInput?.value || "#2039b8";
        const tabBorderColor = tabBorderColorInput?.value || "#23928b";
        const tabBorderWidth = tabBorderWidthInput?.value || "0px";
        const tabBorderStyle = tabBorderStyleInput?.value || "solid";
        const tabBorderRadius = tabBorderRadiusInput?.value || "0px";

        const activeTabColor = activeTabColorInput?.value || "#d3dee7";
        const activeTabFontColor = activeTabFontColorInput?.value || "#2140b7";
        const activeTabBorderStyle = activeTabBorderStyleInput?.value || "solid";
        const underlineColor = underlineColorInput?.value || "#23928b";
        const noBorder = activeTabNoBorderInput?.checked || false;
        const tabGap = tabGapInput?.value || "11px";

        let tabssClass = `tabss ${orientation}`;
        if (predefinedStyleInput.value === "vertical-1") tabssClass += " style-1";
        if (predefinedStyleInput.value === "vertical-2") tabssClass += " style-2";
        if (predefinedStyleInput.value === "horizontal-1") tabssClass += " hstyle-1";
        if (predefinedStyleInput.value === "horizontal-2") tabssClass += " hstyle-2";
        if (activeTabBorderStyle === "underline") {
            tabssClass += " underline-active";
        }

        const underlineStyle = activeTabBorderStyle === "underline" 
            ? `--underline-color:${underlineColor};` : "";

        let html = `
            <div class="box ${rtlClass}" dir="${textDirection}" 
                style="background:${bg};">
                <div class="instruction" style="padding:${instructionPadding};">
                    <div class="insticon">
                        <img src="${icon}" style="width:${iconW};height:${iconH};object-fit:contain;border-radius:9px;"/>
                    </div>
                    <div class="insttext" style="color:${introFontColor};font-size:${Number(introFontSize)}px;padding-left:${introPaddingLeft};font-weight:500;">
                        ${intro}
                    </div>
                </div><br>
                <div class="mainbox" style="padding:${mainboxPadding};display:flex;gap:0px;">
                    <div class="${tabssClass}" style="padding:${tabPadding};gap:${tabGap};${underlineStyle}">
        `;

        const isStyle2  = (predefinedStyleInput.value === "vertical-2");
        const isHStyle1 = (predefinedStyleInput.value === "horizontal-1");
        const isHStyle2 = (predefinedStyleInput.value === "horizontal-2");
        const isUnderline = (activeTabBorderStyle === "underline");

        tabsData.forEach((tab, i) => {
            const isActive = (i === 0);
            const btn_font_color = isActive ? activeTabFontColor : tabFontColor;
            let btn_bg = "transparent";

            if (!isUnderline) {
                btn_bg = isActive ? activeTabColor : tabBgColor;
            }

            let btn_border = "none";
            if (!(isUnderline || isStyle2 || isHStyle1 || isHStyle2)) {
                btn_border = `${tabBorderWidth} ${tabBorderStyle} ${tabBorderColor}`;
                if (isActive && noBorder) {
                    btn_border = "none";
                }
            }

            html += `<button type="button" class="tablinks${isActive ? " active" : ""}"
                style="
                    background:${btn_bg};
                    color:${btn_font_color};
                    font-size:${Number(tabFontSize)}px;
                    padding:${tablinkPadding};
                    ${isStyle2 || isUnderline || isHStyle1 || isHStyle2 ? '' : `border:${btn_border};`}
                    border-radius:${tabBorderRadius};
                "
            >${tab.title}</button>`;
        });

        html += `<p style="margin:0px;"><br></p></div>`;

        tabsData.forEach((tab, i) => {
            html += `<div id="${(tab.id || `tab${i}`)}-${xblockUid}" 
                        class="tabcontent${i===0 ? " active" : ""}" 
                        style="display:${i===0 ? "block" : "none"};">
                        ${tab.content}
                    </div>`;
        });

        html += `</div></div>`;
        previewDiv.innerHTML = html;

        const previewTabs = previewDiv.querySelectorAll('.tablinks');
        const previewPanels = previewDiv.querySelectorAll('.tabcontent');

        previewTabs.forEach((btn, idx) => {
            btn.addEventListener('click', function() {
                previewTabs.forEach(b => b.classList.remove('active'));
                previewPanels.forEach(p => p.style.display = "none");
                btn.classList.add('active');
                previewPanels[idx].style.display = "block";
            });
        });
    }



        function ensureCountAndFill() {
        while (tabsData.length < (parseInt(tabCountInput.value,10) || 1)) {
            const i = tabsData.length;
            tabsData.push({ id: `tab${i}`, title: `Title ${i+1}`, content: '' });
        }
        tabsData = tabsData.slice(0, Math.max(1, parseInt(tabCountInput.value,10) || tabsData.length));
    }

    function renderTabFields() {
        ensureCountAndFill();
        tabFieldsDiv.innerHTML = '';

        tabsData.forEach((tab, idx) => {
            const section = document.createElement('div');
            section.className = 'xblock-form-section';
            section.innerHTML = `
                <label class="xblock-form-label">Tab ${idx + 1} Title</label>
                <input type="text" name="tab_title_${idx}" class="xblock-form-control" value="${tab.title}">
                <label class="xblock-form-label" style="margin-top:10px;">Tab ${idx + 1} Content</label>
                <textarea id="tinymce_tabcontent_${xblockUid}_${idx}" 
                        name="tab_content_${idx}" 
                        class="xblock-form-control tinymce-tabcontent" 
                        rows="12">${tab.content}</textarea>
            `;
            tabFieldsDiv.appendChild(section);
        });

        // Remove old editors cleanly
        tinymce.remove('.tinymce-tabcontent');

        // Initialize TinyMCE per textarea
        setTimeout(function() {
            document.querySelectorAll(`#tabs-xblock-tab-fields .tinymce-tabcontent`).forEach((el) => {
                if (!tinymce.get(el.id)) {
                    tinymce.init({
                        target: el,
                        script_url: data.script_url,
                        skin_url: data.skin_url,
                        theme: "silver",
                        skin: "studio-tmce5",
                        content_css: data.content_css,
                        icons: 'default',
                        icons_url: data.icons_url,
                        plugins: "lists link table code codesample image",
                        external_plugins: data.external_plugins,
                        toolbar: "formatselect | fontselect | bold italic underline forecolor codesample | " +
                                "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | " +
                                "link unlink image | table tabledelete | code",
                        height: 260,
                        branding: false,
                        setup: function(editor) {
                            editor.on('change keyup', function() {
                                const idx = parseInt(editor.id.split('_').pop(), 10);
                                tabsData[idx].content = editor.getContent();
                                renderPreview();
                            });
                        }
                    });
                }
            });
        }, 100);
    }


    function wireInputs() {
        tabCountInput.addEventListener('input', () => {
            tabCountInput.value = Math.min(10, Math.max(1, parseInt(tabCountInput.value,10) || 1));
            ensureCountAndFill();
            renderTabFields();
            renderPreview();
        });
        [
            bgInput, tabFontSizeInput, tabFontColorInput, iconInput, introInput,
            tabPaddingInput, instructionPaddingInput, mainboxPaddingInput,
            tablinkPaddingInput, orientationInput, tabButtonWidthInput, textDirectionInput,
            tabBgColorInput, tabBorderColorInput, tabBorderWidthInput, tabBorderStyleInput, tabBorderRadiusInput,
            activeTabColorInput, activeTabFontColorInput, activeTabBorderStyleInput, activeTabNoBorderInput, underlineColorInput,
            iconWidthInput, iconHeightInput, tabGapInput, introFontColorInput, introFontSizeInput, introPaddingLeftInput
        ].forEach(input => { input && input.addEventListener('input', renderPreview); });
    }

    renderTabFields();
    renderPreview();
    wireInputs();
    runtime.notify('save', {state: 'ready'});

    function save() {
        tabsData.forEach((tab, idx) => {
            const titleEl = tabFieldsDiv.querySelector(`[name="tab_title_${idx}"]`);
            const contentId = `tinymce_tabcontent_${xblockUid}_${idx}`;
            tab.title = titleEl?.value || tab.title || `Tab ${idx+1}`;
            tab.content = tinymce.get(contentId)?.getContent() || tab.content || '';
        });

        const updatedTabs = tabsData.map((tab, idx) => ({
            id: tab.id || `tab${idx}`,
            title: tab.title,
            content: tab.content
        }));

        // Collect settings (✅ now includes tab_count)
        const settings = {
            background_color: bgInput?.value || "#ffffff",
            tab_font_size: tabFontSizeInput?.value || "16",
            tab_font_color: tabFontColorInput?.value || "#000000",
            icon_image_url: iconInput?.value || "",
            intro_text: introInput?.value || "",
            tab_padding: tabPaddingInput?.value || "",
            instruction_padding: instructionPaddingInput?.value || "",
            mainbox_padding: mainboxPaddingInput?.value || "",
            tablink_padding: tablinkPaddingInput?.value || "",
            orientation: orientationInput?.value || "vertical",
            tab_button_width: tabButtonWidthInput?.value || "auto",
            text_direction: textDirectionInput?.value || "ltr",
            tab_bg_color: tabBgColorInput?.value || "#eeeeee",
            tab_border_color: tabBorderColorInput?.value || "#d9d9d9",
            tab_border_width: tabBorderWidthInput?.value || "1px",
            tab_border_style: tabBorderStyleInput?.value || "solid",
            tab_border_radius: tabBorderRadiusInput?.value || "0px",
            active_tab_color: activeTabColorInput?.value || "#ffffff",
            active_tab_font_color: activeTabFontColorInput?.value || "#23928b",
            active_tab_border_style: activeTabBorderStyleInput?.value || "solid",
            underline_color: underlineColorInput?.value || "#23928b",
            active_tab_no_border: activeTabNoBorderInput?.checked || false,
            icon_width: iconWidthInput?.value || "48px",
            icon_height: iconHeightInput?.value || "48px",
            tab_gap: tabGapInput?.value || "0px",
            intro_font_color: introFontColorInput?.value || "#000000",
            intro_font_size: introFontSizeInput?.value || "16",
            intro_padding_left: introPaddingLeftInput?.value || "0px",
            predefined_style: predefinedStyleInput?.value || "default",
            tab_count: tabCountInput?.value || updatedTabs.length   // 🔑 ensure Studio reopens with correct number
        };

        // Notify Studio that save started
        runtime.notify('save', {state: 'start'});

        // First save settings
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'save_settings'),
            data: JSON.stringify(settings),
            contentType: "application/json",
            success: function() {
                // Then save tab content
                $.ajax({
                    type: "POST",
                    url: runtime.handlerUrl(element, 'save_content'),
                    data: JSON.stringify({tabs: updatedTabs}),
                    contentType: "application/json",
                    success: function() {
                        tabsData = updatedTabs.slice();
                        renderPreview();
                        runtime.notify('save', {state: 'end'});  
                    },
                    error: function() {
                        runtime.notify('error', {
                            title: 'Error',
                            message: 'Could not update tabs.'
                        });
                    }
                });
            },
            error: function() {
                runtime.notify('error', {
                    title: 'Error',
                    message: 'Could not update settings.'
                });
            }
        });
    }

    
    const PREDEFINED_STYLES = {
        "default": {
            label: "Default",
            appliesTo: ["vertical"],
            settings: {
                background_color: "#fff8f3",
                tab_button_width: "195px",
                tab_font_color: "#ffffff",
                tab_bg_color: "#2039b8",
                active_tab_color: "#d3dee7",
                active_tab_font_color: "#2140b7",
                active_tab_border_style: "solid" 
            },
            desc: "Vertical tabs, gray text, left-aligned, no border or underline."
        },
        "vertical-1": {
            label: "Style 1",
            appliesTo: ["vertical"],
            settings: {
                background_color: "#ffffff",
                tab_button_width: "195px",
                tab_font_color: "#ffffff",
                tab_bg_color: "#2039b8",
                active_tab_color: "#d3dee7",
                active_tab_font_color: "#2140b7",
                active_tab_border_style: "solid" 
        
            },
            desc: "Vertical tabs, blue fill, active tab is blue/white."
        },
        "vertical-2": {
            label: "Style 2",
            appliesTo: ["vertical"],
            settings: {
                background_color: "#ffffff",
                tab_button_width: "195px",
                tab_font_color: "#2140b7",
                tab_bg_color: "#ffffff",
                active_tab_color: "#ffffff",
                active_tab_font_color: "#2140b7"
            },
            desc: "Vertical tabs, gray/white, teal underline for active."
        },
        "horizontal-1": {
            label: "Horizontal Style 1",
            appliesTo: ["horizontal"],
            settings: {
                background_color: "#ffffff",
                tab_button_width: "auto",
                tab_font_color: "#6b6b6b",
                tab_bg_color: "#ffffff",
                active_tab_color: "#ffffff",
                active_tab_font_color: "#2140b7"
            },
            desc: "Grey baseline with teal underline for active tab."
        },
        "horizontal-2": {
            label: "Horizontal Style 2",
            appliesTo: ["horizontal"],
            settings: {
                background_color: "#ffffff",
                tab_button_width: "200px",
                tab_font_color: "#6b6b6b",
                tab_bg_color: "#eeeeee",
                active_tab_color: "#ffffff",
                active_tab_font_color: "#23928b",
                tab_padding: "0px 0px 0px 0px",
                tab_gap: "0px"
            },
            desc: "Card-style grey tabs; active tab white with teal outline + teal content border."
        }
    };
    function updatePredefinedStylesOptions() {
        if (!predefinedStyleInput) return;
        const currentOrientation = orientationInput.value;
        for (let i = predefinedStyleInput.options.length - 1; i >= 1; i--) {
            predefinedStyleInput.remove(i);
        }
        Object.entries(PREDEFINED_STYLES).forEach(([key, val]) => {
            if(key !== "default" && val.appliesTo.includes(currentOrientation)) {
                if(![...predefinedStyleInput.options].some(opt => opt.value === key)) {
                    const opt = document.createElement('option');
                    opt.value = key;
                    opt.textContent = val.label;
                    if (data.predefined_style === key) opt.selected = true;
                    predefinedStyleInput.appendChild(opt);
                }
            }
        });
        if (!PREDEFINED_STYLES[predefinedStyleInput.value]?.appliesTo?.includes(currentOrientation) && predefinedStyleInput.value !== "default") {
            predefinedStyleInput.value = "default";
        }
        updatePredefinedStyleDesc();
    }

    function updatePredefinedStyleDesc() {
        const selected = PREDEFINED_STYLES[predefinedStyleInput.value];
        if (predefinedStyleDesc && selected) {
            predefinedStyleDesc.textContent = selected.desc || "";
        }
    }

    function applyPredefinedStyle() {
        const selected = PREDEFINED_STYLES[predefinedStyleInput.value];
        if (selected && selected.settings) {
            Object.entries(selected.settings).forEach(([key, val]) => {
                const input = element.querySelector(`[name="${key}"]`);
                if (input) input.value = val;
            });
            renderPreview();
        }
        updatePredefinedStyleDesc();
    }

    if (orientationInput && predefinedStyleInput) {
        orientationInput.addEventListener('change', function() {
            updatePredefinedStylesOptions();
            applyPredefinedStyle();
        });
        predefinedStyleInput.addEventListener('change', function() {
            applyPredefinedStyle();
        });
    }

    updatePredefinedStylesOptions();
    updatePredefinedStyleDesc();
    if(predefinedStyleInput && predefinedStyleInput.value !== "default") {
        applyPredefinedStyle();
    }
    return {
        save: save
    };

}