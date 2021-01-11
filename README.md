# Plotly Homework: Belly Button Diversity

Overview
----
For this assignment, I was tasked with building an interactive dashboard to explore a dataset of belly button biodiversity, which catalogs the microbes found in human navels.

The dataset reveals that a small handful of microbial species (also called **operational taxonomic units, or OTUs,** in the study) were present in more than 70% of people, while the rest were relatively rare. The abbreviation OTUs will be used in this project to represent operational taxonomic units.

Using Plotly, I was tasked with creating multiple charts and visualizations to display the data for each subject. A dropdown menu was created so users can navigate through the different subjects data by selecting their subject ID and having the dashboard display that subjects data. The plots will update anytime a new subject is selected from the dropdown menu.

The deployed app for this project can be found here.

Charts
-----
Below I have included screenshots of the charts for subject 1246 as an example. These images can also be found in the 'images' folder. 

## Horizontal Bar Chart: Top 10 OTU's

This chart displays the top 10 OTUs found in a subject, using the sample values for the x values and the OTU IDs for the y-axis. If you hover over the chart, the OTU labels are displayed, showing the name of the bacteria. 


## Bubble Chart

This chart displays all of the sample values for the subject, using the OTU IDs as the x values and the marker colors, sample values as the y values and the marker size, and OTU labels as the text values that are displayed when hovering over the bubbles.


## Metadata/Dropdown menu

The subjects metadata, including demographic information and the other key-value pairs from the metadata JSON object, is displayed in the demographic information panel on the dashboard.

## Pie Chart

I created a pie chart as an extra visualization, which shows the top 10 OTUs found in the subject and their sample values as a percentage. 


## Bonus: Gauge Chart

This gauge chart displays the subjects belly button wash frequency as the number of scrubs per week (ranging between 0 and 9). The chart displays the number of scrubs, as well as has an indicator line that reflects the number on the chart as well.
