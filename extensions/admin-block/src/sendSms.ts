// sendSms.ts
export async function sendSms(): Promise<void> {
    const apiUrl = 'https://sms-sms.com.ua/api/v2/api.php';

    const requestBody = {
        auth: {
            key: apiKey
        },
        action: "SENDMESSAGE",
        data: {
            recipient: "380507025777", 
            channels: ["sms"],
            sms: {
                source: "Informatica", 
                ttl: 60,
                text: "Hello, this is a test message!"
            }
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('SMS sent successfully:', data);
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
}
