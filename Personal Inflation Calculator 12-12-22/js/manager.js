//OTHER THINGS TO FIX 
//up-down increments on input dont trigger update
//export function broken on edge and firefox
//https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/annual-weight-update-cpi-and-living-cost-indexes/2021#data-download
//https://explore.data.abs.gov.au/vis?tm=selected%20living%20cost%20indexes&pg=0&df[ds]=ECONOMY_TOPICS&df[id]=LCI&df[ag]=ABS&df[vs]=1.0.0&pd=2021-Q1%2C&dq=3.131278..50.Q&ly[cl]=TIME_PERIOD


const CONSUMPTION_TABLE_ID = '#content_table';
const REGION_SELECT_ID = '#region_select';
const REGION_LABEL_ID = '#city_legend_label';
const CHART_TABLE_ID = '#chart-data-table_J0vCHlqo7x';
const QUERTER_MAP = Object.freeze({
    Q1: 'Mar',
    Q2: 'Jun',
    Q3: 'Sep',
    Q4: 'Dec'
});
const TOOLTIP_ID = '#group_tooltip';
// Where does the json come from? weights csv?
var managerSource = {"ids":["20001","30002","30003","30001","114120","131179","131180","30007","20006","30026","30027","20002","131181","30012","97556","20003","115522","131186","131187","30016","20004","131184","131182","97561","97563","97565","115486","131188","131189","20005","30024","30025","115488","30022","115489","131193","131191","30033","115492","115493","40106","126670","115528","131195","10001"],"groups":[{"id":"20001","name":"Food and non-alcoholic beverages","description":"Includes all expenditure on food and non-alcoholic beverages purchased for human consumption.","children":[{"id":"30002","name":"Bread and cereal products","description":"All types of bread. Cakes, muffins, pastries and biscuits. All grain based breakfast cereals, including museli. All types of flour, rice, pasta and similar grain based products, including bran","children":[],"weights":["1.34","1.43","1.45","1.61","1.49","1.62","1.21","1.42","1.43"]},{"id":"30003","name":"Meat and seafoods","description":"","children":[],"weights":["2.32","2.38","2.5","2.61","2.78","2.44","2.94","2.43","2.45"]},{"id":"30001","name":"Dairy and related products","description":"","children":[],"weights":["0.88","1","1.11","1.22","1.09","1.2","1.13","0.97","1.01"]},{"id":"114120","name":"Fruit and vegetables","description":"","children":[],"weights":["2.31","2.25","2.32","2.34","2.37","2.24","2.69","2.44","2.31"]},{"id":"131179","name":"Food products n.e.c.","description":"","children":[],"weights":["1.93","2.11","2.17","2.36","2.43","2.43","1.99","2.01","2.11"]},{"id":"131180","name":"Non-alcoholic beverages","description":"","children":[],"weights":["1.03","1.01","1.23","1.17","1.29","1.23","1.39","1.06","1.1"]},{"id":"30007","name":"Meals out and take away foods","description":"","children":[],"weights":["6.92","6.43","5.72","5.99","5.58","5.67","6.38","6.5","6.35"]}],"weights":["16.73","16.61","16.5","17.3","17.03","16.83","17.73","16.83","16.76"]},{"id":"20006","name":"Alcohol and tobacco","description":"Includes expenditure on all types of beverages containing alcohol such as beer, wine and spirits; and all products containing tobacco such as cigarettes, cigars and cigarette tobacco.","children":[{"id":"30026","name":"Alcoholic beverages","description":"","children":[],"weights":["5.14","5.55","5.82","5.53","5.49","6.16","7.98","4.84","5.45"]},{"id":"30027","name":"Tobacco","description":"","children":[],"weights":["3.05","3.81","4.18","4.31","3.1","5.38","5.2","2.18","3.56"]}],"weights":["8.19","9.36","10","9.84","8.59","11.54","13.18","7.02","9.01"]},{"id":"20002","name":"Clothing and footwear","description":"Includes expenditure on clothing, footwear, accessories such as watches and jewellery and services such as dry cleaning and shoe repair services.","children":[{"id":"131181","name":"Garments","description":"","children":[],"weights":["1.97","2.02","2.01","2.06","1.95","2.1","1.77","1.91","1.99"]},{"id":"30012","name":"Footwear","description":"","children":[],"weights":["0.46","0.5","0.49","0.52","0.46","0.65","0.42","0.65","0.49"]},{"id":"97556","name":"Accessories and clothing services","description":"","children":[],"weights":["0.91","0.85","0.97","0.65","0.74","0.5","0.44","0.67","0.85"]}],"weights":["3.34","3.37","3.47","3.23","3.15","3.25","2.63","3.23","3.33"]},{"id":"20003","name":"Housing","description":"Includes all expenditure on rents, utilities, purchase of new dwellings (excluding land) and other expenditures on shelter-related goods and services.","children":[{"id":"115522","name":"Rents","description":"","children":[],"weights":["7.28","6.02","6.41","5.97","3.84","5.74","5.66","6.56","6.23"]},{"id":"131186","name":"New dwelling purchase by owner-occupiers","description":"","children":[],"weights":["9.47","8.45","8.19","7.93","7.89","7.58","7.09","10.34","8.67"]},{"id":"131187","name":"Other housing","description":"","children":[],"weights":["3.97","3.94","3.52","3.81","4","4.24","4.25","4.2","3.9"]},{"id":"30016","name":"Utilities","description":"","children":[],"weights":["3.82","4.97","3.09","6.04","5.34","3.86","3.83","5.32","4.44"]}],"weights":["24.54","23.38","21.21","23.75","21.07","21.42","20.83","26.42","23.24"]},{"id":"20004","name":"Furnishings, household equipment and services","description":"Covers expenditure on all goods and services used in the operation and regular use of dwellings; plus personal goods and services, including those delivered outside the home.","children":[{"id":"131184","name":"Furniture and furnishings","description":"","children":[],"weights":["1.96","1.92","1.93","2.14","2.08","1.87","2.22","1.84","1.97"]},{"id":"131182","name":"Household textiles","description":"","children":[],"weights":["0.52","0.46","0.51","0.55","0.55","0.48","0.41","0.34","0.5"]},{"id":"97561","name":"Household appliances, utensils and tools","description":"","children":[],"weights":["1.67","1.49","1.52","1.47","1.81","1.98","2.06","1.45","1.6"]},{"id":"97563","name":"Non-durable household products","description":"","children":[],"weights":["2.23","2.3","2.46","2.62","2.71","2.64","2.44","2.2","2.38"]},{"id":"97565","name":"Domestic and household services","description":"","children":[],"weights":["3.09","2.43","3.11","2.09","2.45","2.02","2.47","2.81","2.71"]}],"weights":["9.47","8.6","9.53","8.87","9.6","8.99","9.6","8.64","9.16"]},{"id":"115486","name":"Health","description":"Includes all expenditure relating to health goods and services.","children":[{"id":"131188","name":"Medical products, appliances and equipment","description":"","children":[],"weights":["1.14","1.26","1.29","1.42","1.4","1.26","1.33","1.15","1.25"]},{"id":"131189","name":"Medical, dental and hospital services","description":"","children":[],"weights":["5.41","4.67","5.08","5.51","6.1","5.56","4.04","5.22","5.22"]}],"weights":["6.55","5.93","6.37","6.93","7.5","6.82","5.37","6.37","6.47"]},{"id":"20005","name":"Transport","description":"Includes all expenses related to owning and operating private motor vehicles and travel by public transport within the capital cities. It does not cover public transport used for intercity travel.","children":[{"id":"30024","name":"Private motoring","description":"","children":[],"weights":["9.68","10.44","10.94","9.5","10.71","10.72","10.19","10.68","10.22"]},{"id":"30025","name":"Urban transport fares","description":"","children":[],"weights":["0.51","0.35","0.29","0.22","0.22","0.26","0.11","0.2","0.36"]}],"weights":["10.19","10.79","11.23","9.72","10.93","10.98","10.3","10.88","10.58"]},{"id":"115488","name":"Communication","description":"Covers all expenditure on postal services and telecommunication equipment and services.","children":[{"id":"30022","name":"Communication","description":"","children":[],"weights":["2.31","2.43","2.54","2.49","2.45","2.33","2.72","2.33","2.41"]}],"weights":["2.31","2.43","2.54","2.49","2.45","2.33","2.72","2.33","2.41"]},{"id":"115489","name":"Recreation and culture","description":"All expenditure on recreational products, sporting and recreational activities and holiday travel and accommodation is in the Recreation and culture group.","children":[{"id":"131193","name":"Audio, visual and computing equipment and services","description":"","children":[],"weights":["1.94","2.01","2.08","2.24","2.14","2.37","2.47","2.2","2.05"]},{"id":"131191","name":"Newspapers, books and stationery","description":"","children":[],"weights":["0.54","0.56","0.56","0.6","0.65","0.86","0.49","0.62","0.58"]},{"id":"30033","name":"Holiday travel and accommodation","description":"","children":[],"weights":["2.06","1.91","2.01","1.9","2.18","2.71","2.16","2.39","2.03"]},{"id":"115492","name":"Other recreation, sport and culture","description":"","children":[],"weights":["3.45","3.9","4.75","4.18","4.46","4.41","4.3","4.01","3.98"]}],"weights":["7.99","8.38","9.4","8.92","9.43","10.35","9.42","9.22","8.64"]},{"id":"115493","name":"Education","description":"Includes all expenditure on primary, secondary and tertiary education and preschool services.","children":[{"id":"40106","name":"Education","description":"","children":[],"weights":["4.57","5.02","4.64","3.95","4.61","3.38","3.03","4.19","4.63"]}],"weights":["4.57","5.02","4.64","3.95","4.61","3.38","3.03","4.19","4.63"]},{"id":"126670","name":"Insurance and financial services","description":"Include expenditure on general insurance and financial services.","children":[{"id":"115528","name":"Insurance","description":"","children":[],"weights":["1.17","1.13","1.36","1.3","1.41","1.45","1.51","1.04","1.23"]},{"id":"131195","name":"Financial services","description":"","children":[],"weights":["5","5.04","3.71","3.68","4.25","2.64","3.68","3.78","4.57"]}],"weights":["6.17","6.17","5.07","4.98","5.66","4.09","5.19","4.82","5.8"]},{"id":"10001","name":"All groups CPI","description":"","children":[],"weights":["100","100","100","100","100","100","100","100","100"]}]}
var managerChart;
var managerConsumption = [];

var managerConsumptionTable;
var managerRegionSelect;
var managerRegionLabel;
var managerChartTable;
var managerScaleDiv;
var managerTooltip;

$(document).ready(function() {
    //fetch(`https://api.data.abs.gov.au/data/ABS,CPI,1.1.0/3.${managerSource.ids.join('+')}.10.1+2+3+4+5+6+7+8+50.Q?startPeriod=1974&format=jsondata`)
    // Get last 5 years of data (4 quaters * 5 years = 20 obs)
    fetch(`https://api.data.abs.gov.au/data/ABS,CPI,1.1.0/3.${managerSource.ids.join('+')}.10.1+2+3+4+5+6+7+8+50.Q?firstNObservations=0&lastNObservations=20&format=jsondata`)
    .then((response) => {
		if (!response.ok) {
            throw new Error(`API service error code: ${response.status}`);
		}
		return response.json();
	})
	.then((json) => {
		console.log(json);
        initialiseTable();
        managerScaleDiv = managerConsumptionTable.find('.scale');
        addRegions(json.data.structure.dimensions.series[3].values);
        addQuarters(json.data.structure.dimensions.observation['0'].values);
        appendData(json.data.structure.dimensions.series[1].values, json.data.dataSets[0].series);
        console.log(managerSource);
        var graphX = [];
        for (let i = 0; i < managerSource.quarters.length; i++) {
            graphX.push(managerSource.quarters[i].name);
        }
        managerChartTable = $(CHART_TABLE_ID);
        managerChart = buildGraph(managerSource.groups[managerSource.groups.length - 1].name, graphX, managerChartTable.attr('id'));
        buildSelect();
        let latestQ = managerSource.quarters[managerSource.quarters.length - 1].name;
        $('#personal_quarter').html(latestQ);
        $('#consumer_quarter').html(latestQ);
        assignGroupHovers();
        collapsibleSetup();
        disableLoader();
    })
    .catch((error) => {
        console.log(error);
        displayAlert('No valid connection to API service.\r\n\r\nPlease try again later.');
    });
});

//Page functions
function initialiseTable() {
    managerConsumptionTable = $(CONSUMPTION_TABLE_ID);
    var tbody = managerConsumptionTable.find('tbody');
    var odd = false;
    for (let group of managerSource.groups) {
        if (group.id == '10001') { continue; }
        tbody.append(`<tr class="${(odd) ? 'odd' : 'even'}"><td class="expand"></td><td><span data-tooltip="${group.description}" tabindex="0">${group.name}</span></td><td class="text-align-right"></td><td><input type="number" placeholder="0" min="0" onblur="inputUpdated(this)" /></td><td class="basket"><span tabindex="0"><div></div></span><span tabindex="0"><div></div></span></td></tr>`);
        managerConsumption.push([0, 0]);
        for (let child of group.children) {
            managerConsumption.push([0, 0]);
            tbody.append(`<tr class="hidden ${(odd) ? 'odd' : 'even'} child"><td></td><td class="indent"><span data-tooltip="${child.description}" tabindex="0">${child.name}</span></td><td class="text-align-right"></td><td><input type="number" placeholder="0" min="0" onblur="inputUpdated(this)" /></td></tr>`);
        }
        odd = !odd;
    }
    tbody.on('click', 'td.expand', function() {
        var tr = $(this).closest('tr');
        if (tr.attr('show') == '') {
            tr.find('input').removeAttr('disabled');
            tr.children().last().removeAttr('rowspan');
            tr.removeAttr('show');
            tr = tr.next('tr');
            while (tr.hasClass('child')) {
                tr.toggleClass('hidden');
                tr = tr.next('tr');
            }
        } else {
            tr.attr('show', '');
            tr.find('input').attr('disabled', 'disabled');
            tr = tr.next('tr');
            var count = 1;
            while (tr.hasClass('child')) {
                tr.toggleClass('hidden');
                tr = tr.next('tr');
                count++;
            }
            $(this).closest('tr').children().last().attr('rowspan', count);
        }
    });
}

function disableLoader() {
    var loader = $('#page_loader');
    loader.removeAttr('show');
    loader.parent().parent().children().each(function() {
        $(this).toggleClass('hidden');
    });
}

function buildSelect() {
    var sortedRegions = [];
    for (let i = 0; i < managerSource.regions.length; i++) {
        sortedRegions.push({
            index: i,
            name: managerSource.regions[i].name,
            order: managerSource.regions[i].order
        });
    }
    sortedRegions.sort((a, b) => {
        if ( parseInt(a.order) < parseInt(b.order) ) { return -1; }
        if ( parseInt(a.order) > parseInt(b.order) ) { return 1; }
        return 0;
    });
    managerRegionSelect = $(REGION_SELECT_ID);
    managerRegionLabel = $(REGION_LABEL_ID);
    managerRegionSelect.append(`<option value="${sortedRegions[0].index}">${sortedRegions[0].name}</option>`);
    for (let i = 1; i < sortedRegions.length; i++) {
        managerRegionSelect.append(`<option value="${sortedRegions[i].index}">${sortedRegions[i].name}</option>`);
    }
    managerRegionSelect.on('change', function() {
        var regionIndex = $(this).val();
        var weightIndex = managerSource.regions[regionIndex].order - 1;
        weightIndex = (weightIndex < 0) ? managerSource.regions.length - 1 : weightIndex;
        var inflationRates = [];
        var index = 0;
        // for (let group of managerSource.groups) {
        //     if (group.id == '10001') { continue; }
        //     inflationRates.push(group.values[regionIndex][group.values[regionIndex].length - 1].toFixed(1));
        //     managerConsumption[index][1] = parseFloat(group.weights[weightIndex]);
        //     for (let subGroup of group.children) {
        //         inflationRates.push(subGroup.values[regionIndex][subGroup.values[regionIndex].length - 1].toFixed(1));
        //     }
        //     index++;
        // }
        for (let group of managerSource.groups) {
            if (group.id == '10001') { continue; }
            inflationRates.push(group.values[regionIndex][group.values[regionIndex].length - 1].toFixed(1));
            managerConsumption[index][1] = parseFloat(group.weights[weightIndex]);
            for (let subGroup of group.children) {
                inflationRates.push(subGroup.values[regionIndex][subGroup.values[regionIndex].length - 1].toFixed(1));
                managerConsumption[index][1] = parseFloat(subGroup.weights[weightIndex]);
                index++;
            }
            index++;
        }

        updateTableColumn(2, inflationRates);
        managerRegionLabel.html(managerRegionSelect.find('option:selected').html() + ' consumption');
        calculateScale();
    });
    managerRegionSelect.next().on('click', function() {
        managerConsumptionTable.find('input').each(function () {
            $(this).val('');
        });
        for (consumption of managerConsumption) {
            consumption[0] = 0;
        }
        calculateScale();
    });
    importValuesSetup(managerRegionSelect.next().next());
    exportValuesSetup(managerRegionSelect.next().next().next());
    managerRegionSelect.trigger('change');
}

function updateTableColumn(colIndex, values, ignoreChildren = false) {
    var rows = managerConsumptionTable.find('tbody').children();
    var index = 0;
    rows.each(function() {
        var row = $(this);
        if (ignoreChildren) {
            if (row.hasClass('child')) { return; }
        }
        var cell = row.children().eq(colIndex)
        switch (colIndex) {
            case 3:
                cell.children().first().val(values[index]);
                break;
            case 4:
                if (values[index][0] != null) { 
                    cell.children().first().attr('style', `width: ${values[index][0]}%`);
                    cell.children().first().children().first().html(`Personal consumption: ${(managerConsumption[index][0]) ? managerConsumption[index][0].toFixed(1) : 0}%`);
                }
                if (values[index][1] != null) { 
                    cell.children().last().attr('style', `width: ${values[index][1]}%`);
                    cell.children().last().children().first().html(`City consumption: ${(managerConsumption[index][1]) ? managerConsumption[index][1].toFixed(1) : 0}%`);
                }
                break;
            default:
                cell.html(values[index]);
                break;
        }
        index++;
    });
}

function populateIndicators(personal, consumer) {
    if (isNaN(personal)) { personal = 0; }
    $('#personal_value').html(`${personal.toFixed(1)}%`);
    $('#consumer_value').html(`${consumer.toFixed(1)}%`);
}

function updateGraph(title, personal, consumer) {
    var newTitle = `Annual movement - ${title}`;
    managerChartTable.find('caption').html(newTitle);
    managerChart.update({
        title : {
            text: newTitle
        },
        series: [
            {
                data: personal
            },
            {
                data: consumer
            }
        ]
    });
    managerChartTable.DataTable().rows().every(function(row, tLoop, rLoop) {
        var data = this.data();
        data[1] = personal[row].toFixed(1);
        data[2] = consumer[row].toFixed(1);
        this.data(data);
    });
}

function importValuesSetup(input) {
    input.find('input').on('change', function() {
        if (this.files.length <= 0) { return; }
        var reader = new FileReader();
        reader.onload = function(e) {
            var arr = $.csv.toArrays(e.target.result);
            var message = 'Invalid CSV.\r\n\r\nPlease try a different CSV.';
            if (arr.length == 0) { displayAlert(message); return; }
            if (arr[0].length == 0) { displayAlert(message); return; }
            managerConsumptionTable.find('input').each(function (index) {
                if (index > arr.length - 1) { return; }
                var value = parseFloat(arr[index][1]);
                if (isNaN(value)) {
                    $(this).val('');
                } else {
                    $(this).val(value);
                }
            });
            inputUpdated(null);
        };
        reader.readAsText(this.files[0]);
    });
}

function exportValuesSetup(btn) {
    btn.on('click', function() {
        var output = [];
        managerConsumptionTable.find('tbody').children().each(function() {
            var row = $(this);
            var name = (row.hasClass('child')) ? ` ${row.children().eq(1).html()}` : `${row.children().eq(1).html()}`;
            var value = (row.find('input').val()) ? parseFloat(row.find('input').val()) : 0;
            var row = [name, value];
            output.push(row);
        });
        var element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent($.csv.fromArrays(output))}`);
        element.setAttribute('download', 'consumption.csv');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
}

function displayAlert(message) {
    alert(message);
}

function assignGroupHovers() {
    managerTooltip = $(TOOLTIP_ID);
    managerConsumptionTable.find('[data-tooltip]').each((i, obj) => {
        $(obj).on('mouseenter', () => {
            managerTooltip.html($(obj).attr('data-tooltip'));
            let left = $(obj).offset().left;
            let top = $(obj).offset().top - ($(obj).height() * 2) - managerTooltip.height() - 8;
            managerTooltip.attr('style', `visibility: visible; left: ${left}px; top: ${top}px;`);
        });
        $(obj).on('mouseleave', () => {
            managerTooltip.html('');
            managerTooltip.removeAttr('style');
        });
    });
}

function collapsibleSetup() {
    $('.collapsible-closed').each((i, obj) => {
        var col = $(obj);
        col.on('click', (e) => { e.preventDefault(); collapseClick(obj, obj.lastElementChild); });
        col.on('keyup', (e) => { if ("Enter" === e.key) return collapseClick(obj, obj.lastElementChild), !1 });
    });
}

function collapseClick(e,a) {
    e.classList.toggle("collapsible-closed");
    var r = e.querySelector(".abs-content-title > .abs-subsection-title");
    r.setAttribute("aria-expanded", "false" == r.getAttribute("aria-expanded") ? "true" : "false"), $(a).slideToggle("fast"), a.setAttribute("aria-hidden", "false" == a.getAttribute("aria-hidden") ? "true" : "false");
}


//Data structure manipulation functions
function addRegions(regions) {
    managerSource['regions'] = regions
}

function addQuarters(quarters) {
    var newQuarters = [];
    quarters.forEach(q => {
        let temp = q.name.split('-');
        newQuarters.push({
            id: q.id,
            name: `${QUERTER_MAP[temp[1]]}-${temp[0]}`
        });
    });
    managerSource['quarters'] = newQuarters;
}

function appendData(groups, series) {
    for(let i = 0; i < groups.length; i++) {
        if (groups[i].parent && groups[i].parent != '10001') {
            matchChild(groups[i], i, series);
        } else {
            matchGroup(groups[i], i, series);
        }
    }
}

function matchGroup(group, index, series) {
    for (let i = 0; i < managerSource.groups.length; i++) {
        if (group.id != managerSource.groups[i].id) { continue; }
        appendValues(managerSource.groups[i], index, series);
        break;
    }
}

function matchChild(group, index, series) {
    for (let i = 0; i < managerSource.groups.length; i++) {
        if (group.parent != managerSource.groups[i].id) { continue; }
        for (let j = 0; j < managerSource.groups[i].children.length; j++) {
            if (group.id != managerSource.groups[i].children[j].id) { continue; }
            appendValues(managerSource.groups[i].children[j], index, series);
            break;
        }
        break;
    }
}

function appendValues(dest, sourceIndex, series) {
    var groupValues = [];
    for (let i = 0; i < managerSource.regions.length; i++) {
        var regionValues = [];
        var regionSeries = series[`0:${sourceIndex}:0:${i}:0`].observations;
        let length = managerSource.quarters.length;
        for (let j = 0; j < length; j++) {
            if (regionSeries.hasOwnProperty(j)) {
                regionValues.push(parseFloat(regionSeries[`${j}`][0]));
            } else {
                regionValues.push(0);
            }
        }
        groupValues.push(regionValues);
    }
    dest['values'] = groupValues;
}

//Calculation functions
function inputUpdated(input) {
    // Tally up subgroups at group level
    if (input != null) {
        console.log(input);
        var tr = $(input).closest('tr');
        //if its a child row, find the first child within the group and start tallying
        if (tr.hasClass('child')) {
            while (tr.prev().hasClass('child')) {
                tr = tr.prev();
            }
            var parent = tr.prev();
            var subGroupsTotal = 0;
            while (tr.hasClass('child')) {
                var i = tr.find('input');
                subGroupsTotal += (i.val()) ? parseFloat(i.val()) : 0;
                tr = tr.next();
            }

            parent.find('input').val(subGroupsTotal);
            parent.find('input').data('lastValue', subGroupsTotal);
            parent.find('input').data('hasSubgroupData', true);
        // if its the parent row clear the children rows
        } else {
            //console.log($(input).data('lastValue'), tr.find('input').val());
            if ($(input).data('lastValue') != tr.find('input').val()) {
                tr = tr.next('tr');
                while (tr.hasClass('child')) {
                    tr.find('input').val('');
                    tr = tr.next();
                }
                //$(input).data('hasSubgroupData', false);
            }
            
        }
        $(input).data('lastValue', input.value);
    }
    //console.log(subGroupsTotal)

    // Store group consumption and tally up total consumption (needed for sparkline graph).
    var personalTotal = 0;
    var groupValues = [];
    managerConsumptionTable.find('tbody').children().each(function() {
        var i = $(this).find('input');
        var val = (i.val()) ? parseFloat(i.val()) : 0;
        groupValues.push(val);  
        if (!$(this).hasClass('child')) { 
            personalTotal += val;
        }      
    });
    // Calculate percent for each group and store for later use
    var index = 0;
    //console.log("ptotal",personalTotal)
    for (value of groupValues) {
        // managerConsumption: personal consumption, consumer consumption
        managerConsumption[index][0] = (personalTotal > 0) ? (value / personalTotal) * 100 : 0;
        //console.log(value, managerConsumption[index][0]);
        index++;
    }
    calculateScale();
}

function calculateScale() {
    var highestValue = 0;
    for (consumption of managerConsumption) {
        if (consumption[0] > highestValue) {
            highestValue = consumption[0];
        }
        if (consumption[1] > highestValue) {
            highestValue = consumption[1];
        }
    }
    highestValue = Math.ceil(highestValue);
    var scaleTopEnd = 100;
    for (let i = highestValue; i < 100; i++) {
        if (i % 5 == 0) {
            if (i % 4 == 0) { 
                scaleTopEnd = i;
                break;
            }
        }
    }
    var interval = scaleTopEnd / 4;
    managerScaleDiv.children().each(function(index) {
        var x = $(this).find('span');
        x.html(0 + index * interval);
    });
    var scaledValues = [];
    for (consumption of managerConsumption) {
        scaledValues.push([(consumption[0] / scaleTopEnd) * 100, (consumption[1] / scaleTopEnd ) * 100]);
    }
    //updateTableColumn(4, scaledValues, true);
    updateTableColumn(4, scaledValues, false);
    calculatePersonalRate();
}

function calculatePersonalRate() {
    var selectRegionIndex = managerRegionSelect.val();
    var personalY = [];
    var consumerY = [];  
    // do this for all quarters - required for the graph
    for (let i = 0; i < managerSource.quarters.length; i++) {
        var personalQuarterRate = 0;
        let index = 0;
        // aggregate all the groups
        for (let j = 0; j < managerSource.groups.length - 1; j++) {
            
            let hasSubgroupData = false;
            let groupRate = managerSource.groups[j].values[selectRegionIndex][i] * (managerConsumption[index][0] / 100);
            //console.log("group index ", index, managerConsumption[index][0]);
            // check for sub groups
            if(managerSource.groups[j].children.length > 0){
                for (let k = 0; k < managerSource.groups[j].children.length; k++) { 
                    index++;
                    //console.log("subgroup index ", index,managerConsumption[index][0]);
                    if (managerConsumption[index][0] > 0){
                        hasSubgroupData = true;
                        let subgroupRate = managerSource.groups[j].children[k].values[selectRegionIndex][i] * (managerConsumption[index][0] / 100);
                        //console.log("has subgroup data", managerConsumption[index][0])
                        personalQuarterRate += subgroupRate;
                        
                    }
                }
            }
            // managerConsumption is a percentage -> convert to fraction
            if (!hasSubgroupData) {
                personalQuarterRate += groupRate;
                //console.log("no subgroup data ", groupRate);
            }
            index++;
            
            
            
            
        }
        personalY.push(personalQuarterRate);
        consumerY.push(managerSource.groups[managerSource.groups.length - 1].values[selectRegionIndex][i]);
    }
    console.log(personalY, consumerY);
    // Display last data point (most recent)
    populateIndicators(personalY[personalY.length - 1], consumerY[consumerY.length - 1]);
    updateGraph(managerSource.regions[selectRegionIndex].name, personalY, consumerY);
}