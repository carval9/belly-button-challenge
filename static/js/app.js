// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    for(i=0;i<metadata.length;i++){
      if(metadata[i].id==sample){
        id = metadata[i].id;
        ethnicity = metadata[i].ethnicity;
        gender = metadata[i].gender;
        age = metadata[i].age;
        loc = metadata[i].location;
        bbtype = metadata[i].bbtype;
        wfreq = metadata[i].wfreq;
      };
    };

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadata_panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadata_panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    metadata_panel.append('p').text("ID: "+id);
    metadata_panel.append('p').text("ETHNICITY: "+ethnicity);
    metadata_panel.append('p').text("GENDER: "+gender);
    metadata_panel.append('p').text("AGE: "+age);
    metadata_panel.append('p').text("LOCATION: "+loc);
    metadata_panel.append('p').text("BBTYPE: "+bbtype);
    metadata_panel.append('p').text("WFREQ: "+wfreq);

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    samples = data.samples;

    // Filter the samples for the object with the desired sample number
    for(i=0;i<samples.length;i++){
      if(samples[i].id==sample){
        id = samples[i].id;
        otus_ids = samples[i].otu_ids;
        sample_values = samples[i].sample_values;
        otu_labels = samples[i].otu_labels;
      };
    };

    // Get the otu_ids, otu_labels, and sample_values
    new_reverse_sample_values = sample_values.slice(0,10).reverse();
    new_sample_values = sample_values.slice(0,10);
    new_otus_ids= otus_ids.slice(0,10).toString();
    new_otus_ids_num= otus_ids//.slice(0,10);
    new_textValues = otu_labels.slice(0,10).reverse();

    // Build a Bubble Chart
    let new_valor_bub = [{
      x:new_otus_ids,
      y:new_sample_values,
      text:new_textValues,
      type:"bubbles",
      mode: "markers",
      marker:{
        size:new_sample_values,
        color:new_otus_ids_num
      }
   }];

      let new_layout_bub = {
        title:"Bacteria Cultures Per Sample",
        xaxis:{title:"OTU ID"},
        yaxis:{title:"Number of Bacteria"}
      };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", new_valor_bub, new_layout_bub);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let new_valor_bar = [{
      x:new_reverse_sample_values,
      y:new_otus_ids,
      text:new_textValues,
      type:"bar",
      orientation:"h"
    }];

    let new_layout_bar = {
      title:"Top 10 Bacteria Cultures Found",
      xaxis:{title:"Number of Bacteria"},
      margin: {
        l: 50,
        r: 50,
        b: 200,
        t: 50,
        pad: 4
      }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", new_valor_bar, new_layout_bar);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for(let i = 0; i < names.length; i++){
      dropdown.append("option").text(names[i])
    }

    // Get the first sample from the list
    reverse_sample_values = data.samples[0].sample_values.slice(0,10).reverse();
    sample_values = data.samples[0].sample_values.slice(0,10);
    otus_ids= data.samples[0].otu_ids.slice(0,10).toString();
    otus_ids_num= data.samples[0].otu_ids.slice(0,10);
    textValues = data.samples[0].otu_labels.slice(0,10).reverse();

    let valor_bar = [{
      x:reverse_sample_values,
      y:otus_ids,
      text:textValues,
      type:"bar",
      orientation:"h"
    }];

    let layout_bar = {
      title:"Top 10 Bacteria Cultures Found",
      xaxis:{title:"Number of Bacteria"},
      margin: {
        l: 50,
        r: 50,
        b: 200,
        t: 50,
        pad: 4
      }
    };

    let valor_bub = [{
      x:otus_ids,
      y:sample_values,
      text:textValues,
      type:"bubbles",
      mode: "markers",
      marker:{
        size:sample_values,
        color:otus_ids_num
      }
   }];

      let layout_bub = {
        title:"Bacteria Cultures Per Sample",
        xaxis:{title:"OTU ID"},
        yaxis:{title:"Number of Bacteria"}
    };

    // Build charts and metadata panel with the first sample
    let metadata = d3.select("#sample-metadata");
    metadata.append('p').text("ID: "+data.metadata[0].id);
    metadata.append('p').text("ETHNICITY: "+data.metadata[0].ethnicity);
    metadata.append('p').text("GENDER: "+data.metadata[0].gender);
    metadata.append('p').text("AGE: "+data.metadata[0].age);
    metadata.append('p').text("LOCATION: "+data.metadata[0].location);
    metadata.append('p').text("BBTYPE: "+data.metadata[0].bbtype);
    metadata.append('p').text("WFREQ: "+data.metadata[0].wfreq);

    Plotly.newPlot("bar", valor_bar, layout_bar);
    Plotly.newPlot("bubble", valor_bub, layout_bub);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();

// On change to the DOM, call getData()
d3.select("#selDataset").on("change", optionChanged);



// for(i=0;i < 7; i++){
//   console.log("Id: " + data.metadata[i].id);
//   console.log("ethnicity :" + data.metadata[i].ethnicity);
// };