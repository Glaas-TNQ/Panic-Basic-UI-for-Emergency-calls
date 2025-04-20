// Replace these with your actual Twilio credentials and phone numbers
const TWILIO_ACCOUNT_SID = 'AC8';
const TWILIO_AUTH_TOKEN = '10ef2';
const TWILIO_PHONE_NUMBER = '+14';

// Replace these with your target phone numbers
const TARGET_PHONE_NUMBERS = [
    '+393',
    '+393273',
    '+39328446',
    '+39320240'
];

// The message to be sent
const MESSAGE_TEXT = 'NONNA HA BISOGNO DI AIUTO, METTETEVI IN CONTATTO! ';

document.getElementById('emergencyButton').addEventListener('click', async () => {
    try {
        // Show loading state
        const button = document.getElementById('emergencyButton');
        button.disabled = true;
        button.textContent = 'INVIO SMS...';

        // Send messages to all phone numbers
        for (const phoneNumber of TARGET_PHONE_NUMBERS) {
            const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'To': phoneNumber,
                    'From': TWILIO_PHONE_NUMBER,
                    'Body': MESSAGE_TEXT
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to send message to ${phoneNumber}`);
            }
        }

        // Reset button state
        button.textContent = 'SMS INVIATO !';
        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'AIUTO!';
        }, 10000);

    } catch (error) {
        console.error('Error:', error);
        const button = document.getElementById('emergencyButton');
        button.textContent = 'ERROR!';
        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'AIUTO!';
        }, 3000);
    }
}); 