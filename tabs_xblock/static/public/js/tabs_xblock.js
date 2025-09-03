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
        const tablinkPadding = tablinkPaddingInput?.value || "12px 0";
        const orientation = orientationInput?.value || "vertical";
        const tabButtonWidth = tabButtonWidthInput?.value || "195px";
        const textDirection = textDirectionInput?.value || "ltr";
        const rtlClass = textDirection === "rtl" ? "rtl" : "";
        const tabBgColor = tabBgColorInput?.value || "#2039b8";
        const tabBorderColor = tabBorderColorInput?.value || "#e3e3e3";
        const tabBorderWidth = tabBorderWidthInput?.value || "0px";
        const tabBorderStyle = tabBorderStyleInput?.value || "solid";
        const tabBorderRadius = tabBorderRadiusInput?.value || "0px";
        const activeTabColor = activeTabColorInput?.value || "#d3dee7";
        const activeTabFontColor = activeTabFontColorInput?.value || "#2140b7";
        const activeTabBorderStyle = activeTabBorderStyleInput?.value || "solid";
        const underlineColor = underlineColorInput?.value || "#23928b";
        const tabGap = tabGapInput?.value || "11px";

        let underlineStyle = "";
        let tabssClass = `tabss ${orientation}`;
        if (predefinedStyleInput.value === "vertical-1") tabssClass += " style-1";
        if (predefinedStyleInput.value === "vertical-2") tabssClass += " style-2";
        if (predefinedStyleInput.value === "horizontal-2") tabssClass += " hstyle-2"; 
        if (activeTabBorderStyle === "underline") {
            tabssClass += " underline-active";
            underlineStyle = `--underline-color: ${underlineColor};`;
        }

        const mainboxGap = (predefinedStyleInput.value === "horizontal-2") ? "0px" : "16px";

        let html = `
            <div class="box ${rtlClass}" dir="${textDirection}" style="background:${bg};">
                <div class="instruction" style="padding:${instructionPadding};">
                    <div class="insticon">
                        <img src="${icon}" style="width:${iconW};height:${iconH};object-fit:contain;border-radius:9px;"/>
                    </div>
                    <div class="insttext" style="color:${introFontColor};font-size:${Number(introFontSize)}px;padding-left:${introPaddingLeft};font-weight:500;">${intro}</div>
                </div><br>
                <div class="mainbox" style="padding:${mainboxPadding};display:flex;gap:${mainboxGap};">
                    <div class="${tabssClass}" style="padding:${tabPadding};gap:${tabGap};${underlineStyle}">
        `;

        const isHStyle2 = (predefinedStyleInput.value === "horizontal-2"); 
        

        tabsData.forEach((tab, i) => {
            const isActive = i === 0;
            const isUnderline = activeTabBorderStyle === "underline";

            const btn_bg = isHStyle2
                ? (isActive ? "#ffffff" : "#eeeeee")
                : (isUnderline ? "transparent" : (isActive ? activeTabColor : tabBgColor));

            const btn_font_color = isActive ? activeTabFontColor : tabFontColor;

            let btn_border = "none";
            if (!isUnderline && !isHStyle2) {
                btn_border = `${tabBorderWidth} ${tabBorderStyle} ${tabBorderColor}`;
                const noBorder = element.querySelector('[name="active_tab_no_border"]')?.checked;
                if (isActive && noBorder) { btn_border = "none"; }
            }

            html += `<button type="button" class="tablinks${isActive ? " active" : ""}" 
                style="
                    width:${tabButtonWidth};
                    background:${btn_bg};
                    color:${btn_font_color};
                    font-size:${Number(tabFontSize)}px;
                    padding:${tablinkPadding};
                    border:${btn_border};
                    border-radius:${isHStyle2 ? '8px 8px 0 0' : tabBorderRadius};
                    font-weight:600;
                    transition:background 0.18s, color 0.18s, border 0.18s;
                    ${isActive && isHStyle2 ? 'margin-bottom:-3px;' : ''}
                "
            >${tab.title}</button>`;
        });

        html += `<p style="margin:0px;"><br></p></div>`;

        tabsData.forEach((tab, i) => {
            html += `<div id="${(tab.id||`tab${i}`)}-${xblockUid}" class="tabcontent${i===0 ? " active" : ""}" style="display:${i===0 ? "block" : "none"};">${tab.content}</div>`;
        });

        html += `</div></div>`;
        previewDiv.innerHTML = html;


        const box = previewDiv.querySelector('.mainbox');
        if (!box) return;
        const previewTabs = box.querySelectorAll('.tablinks');
        const previewPanels = box.querySelectorAll('.tabcontent');
        previewTabs.forEach((btn, idx) => {
            btn.addEventListener('click', function() {
                const isUnderline = activeTabBorderStyle === "underline";
                const isHS2 = (predefinedStyleInput.value === "horizontal-2");
                previewTabs.forEach((b) => {
                    b.classList.remove('active');
                    if (isUnderline) {
                        b.style.background = "transparent";
                        b.style.color = tabFontColor;
                        b.style.border = "none";
                        b.style.marginBottom = "0";
                        b.style.borderRadius = "0";
                    } else if (isHS2) {
                        b.style.background = "#eeeeee";
                        b.style.color = tabFontColor;
                        b.style.border = "none";
                        b.style.borderRadius = "8px 8px 0 0";
                        b.style.marginBottom = "0";
                    } else {
                        b.style.background = tabBgColor;
                        b.style.color = tabFontColor;
                        b.style.border = `${tabBorderWidth} ${tabBorderStyle} ${tabBorderColor}`;
                        b.style.borderRadius = tabBorderRadius;
                        b.style.marginBottom = "0";
                    }
                });
                previewPanels.forEach(p => p.style.display = "none");
                btn.classList.add('active');
                previewPanels[idx].style.display = "block";

                if (isUnderline) {
                    btn.style.background = "transparent";
                    btn.style.border = "none";
                    btn.style.color = activeTabFontColor;
                    btn.style.marginBottom = "0";
                } else if (isHS2) {
                    btn.style.background = "#ffffff";
                    btn.style.border = "none"; 
                    
                    btn.style.color = activeTabFontColor;
                    btn.style.borderRadius = "8px 8px 0 0";
                    btn.style.marginBottom = "-3px";
                } else {
                    btn.style.background = activeTabColor;
                    btn.style.color = activeTabFontColor;
                    const noBorder = element.querySelector('[name="active_tab_no_border"]')?.checked;
                    btn.style.border = noBorder ? "none" : `${tabBorderWidth} ${tabBorderStyle} ${tabBorderColor}`;
                    btn.style.borderRadius = tabBorderRadius;
                    btn.style.marginBottom = "0";
                }
            });
        });
        if (previewTabs[0]) {
            const isUnderline = activeTabBorderStyle === "underline";
            const isHS2 = (predefinedStyleInput.value === "horizontal-2");
            if (isUnderline) {
                previewTabs[0].style.background = "transparent";
                previewTabs[0].style.border = "none";
                previewTabs[0].style.color = activeTabFontColor;
                previewTabs[0].style.marginBottom = "0";
            } else if (isHS2) {
                previewTabs[0].style.background = "#ffffff";
                previewTabs[0].style.border = "none";
                previewTabs[0].style.color = activeTabFontColor;
                previewTabs[0].style.borderRadius = "8px 8px 0 0";
                previewTabs[0].style.marginBottom = "-3px";
            } else {
                previewTabs[0].style.background = activeTabColor;
                previewTabs[0].style.color = activeTabFontColor;
            }
        }
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
                <label class="xblock-form-label">Tab ${idx+1} Title</label>
                <input type="text" name="tab_title_${idx}" class="xblock-form-control" value="${tab.title}">
                <label class="xblock-form-label" style="margin-top:10px;">Tab ${idx+1} Content</label>
                <textarea id="tinymce_tabcontent_${xblockUid}_${idx}" name="tab_content_${idx}" class="xblock-form-control tinymce-tabcontent" rows="12">${tab.content}</textarea>
            `;
            tabFieldsDiv.appendChild(section);
        });

        setTimeout(function() {
            document.querySelectorAll(`.tinymce-tabcontent`).forEach(function(area) {
                if (tinymce.get(area.id)) tinymce.get(area.id).remove();
                tinymce.init({
                    selector: `#${area.id}`,
                    menubar: false,
                    plugins: 'image link lists code',
                    toolbar: 'undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | image link | code',
                    height: 260,
                    branding: false,
                    images_upload_handler: function (blobInfo, success, failure) {
                        success('data:' + blobInfo.blob().type + ';base64,' + blobInfo.base64());
                    },
                    setup: function(editor) {
                        editor.on('change keyup', function() {
                            area.value = editor.getContent();
                            const idx = parseInt(area.id.split('_').pop(),10);
                            tabsData[idx].content = area.value;
                            renderPreview();
                        });
                    }
                });
            });
        }, 120);
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


    element.querySelector('.xblock-form-save-button').addEventListener('click', function(evt) {
        evt.preventDefault();


        tabsData.forEach((tab, idx) => {
            const titleEl = tabFieldsDiv.querySelector(`[name="tab_title_${idx}"]`);
            const contentId = `tinymce_tabcontent_${xblockUid}_${idx}`;
            tab.title = titleEl?.value || tab.title || `Tab ${idx+1}`;
            tab.content = tinymce.get(contentId)?.getContent() || tab.content || '';
        });

        const settings = {
            display_name: element.querySelector('[name=display_name]').value,
            icon_image_url: iconInput?.value || "",
            intro_text: introInput?.value || "",
            tab_count: parseInt(tabCountInput.value,10) || tabsData.length,
            background_color: bgInput?.value || "#fff8f3",
            tab_font_size: tabFontSizeInput?.value || "16",
            tab_font_color: tabFontColorInput?.value || "#6b6b6b",
            tab_padding: tabPaddingInput?.value || "30px 30px 18px 30px",
            instruction_padding: instructionPaddingInput?.value || "10px 15px",
            mainbox_padding: mainboxPaddingInput?.value || "20px 0px",
            tablink_padding: tablinkPaddingInput?.value || "12px 0",
            orientation: orientationInput?.value || "vertical",
            intro_font_color: introFontColorInput?.value || "#000000",
            intro_font_size: introFontSizeInput?.value || "16",
            intro_padding_left: introPaddingLeftInput?.value || "0px",
            tab_button_width: tabButtonWidthInput?.value || "195px",
            text_direction: textDirectionInput?.value || "ltr",
            icon_width: iconWidthInput?.value || "48px",
            icon_height: iconHeightInput?.value || "48px",
            predefined_style: predefinedStyleInput?.value || "default",
            tab_bg_color: tabBgColorInput?.value || "#2039b8",
            tab_border_color: tabBorderColorInput?.value || "#e3e3e3",
            tab_border_width: tabBorderWidthInput?.value || "0px",
            tab_border_style: tabBorderStyleInput?.value || "solid",
            tab_border_radius: tabBorderRadiusInput?.value || "0px",
            active_tab_color: activeTabColorInput?.value || "#d3dee7",
            active_tab_font_color: activeTabFontColorInput?.value || "#2140b7",
            active_tab_border_style: activeTabBorderStyleInput?.value || "solid",
            underline_color: underlineColorInput?.value || "#23928b",
            active_tab_no_border: activeTabNoBorderInput?.checked ? "true" : "false",
            tab_gap: tabGapInput?.value || "11px",
        };

        const updatedTabs = tabsData.map((tab, idx) => ({
            id: tab.id || `tab${idx}`,  
            title: tab.title || `Tab ${idx+1}`,
            content: tab.content || ''
        }));

        runtime.notify('save', {state: 'start'});
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'save_settings'),
            data: JSON.stringify(settings),
            contentType: "application/json",
            success: function() {
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
                        runtime.notify('error', {title: 'Error saving content', message: 'Could not update tabs.'});
                    }
                });
            },
            error: function() {
                runtime.notify('error', {title: 'Error saving settings', message: 'Could not update settings.'});
            }
        });
    });

    element.querySelector('.xblock-form-cancel-button').addEventListener('click', function(evt) {
        evt.preventDefault();
        runtime.notify('cancel');
    });
    
    const PREDEFINED_STYLES = {
        "default": {
            label: "Default",
            appliesTo: ["vertical"],
            settings: {
                background_color: "#fff8f3",
                tab_button_width: "195px",
                tab_font_color: "#ffffff",
                tab_font_size: "16",
                tab_border_radius: "0px",
                tab_bg_color: "#2039b8",
                active_tab_color: "#d3dee7",
                active_tab_font_color: "#2140b7",
                tab_border_color: "#23928b",
                tab_border_width: "0px",
                tab_border_style: "solid"
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
                tab_font_size: "16",
                tab_border_radius: "0px",
                tab_bg_color: "#2039b8",
                active_tab_color: "#d3dee7",
                active_tab_font_color: "#2140b7",
                tab_border_color: "#23928b",
                tab_border_width: "0px",
                tab_border_style: "solid"
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
                tab_font_size: "16",
                tab_border_radius: "0px",
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
                tab_font_size: "18",
                tab_font_color: "#6b6b6b",
                active_tab_font_color: "#23928b",
                active_tab_border_style: "underline",
                underline_color: "#23928b",
                active_tab_no_border: "true",
                tab_bg_color: "transparent",
                tab_border_width: "0px",
                tab_border_style: "solid",
                tab_border_color: "#e3e3e3",
                tab_border_radius: "0px",
                active_tab_color: "transparent",
                tab_padding: "0 16px 0 16px",
                tablink_padding: "12px 0",
                tab_gap: "24px"
            },
            desc: "Grey baseline with teal underline for active tab."
        },
        "horizontal-2": {
            label: "Horizontal Style 2",
            appliesTo: ["horizontal"],
            settings: {
                background_color: "#ffffff",
                tab_button_width: "auto",
                tab_font_size: "20",
                tab_font_color: "#6b6b6b",
                tab_bg_color: "#eeeeee",
                active_tab_color: "#ffffff",
                active_tab_font_color: "#23928b",
                tab_border_color: "#d9d9d9",
                tab_border_style: "solid",
                tab_border_radius: "8px 8px 0 0",
                active_tab_border_style: "solid",
                active_tab_no_border: "false",
                tab_padding: "0 16px 0 16px",
                tablink_padding: "14px 24px",
                tab_gap: "12px"
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
}
