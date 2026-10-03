const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

let transporter;

// Create testing account for Ethereal
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Test email account ready.');

    transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
});

app.post('/api/radicar', async (req, res) => {
    if (!transporter) {
        return res.status(503).json({ error: 'Mail service is not ready yet' });
    }

    try {
        const data = req.body;
        
        // HTML Template matching the PDF
        const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FEEEE2; padding: 40px; color: #295457;">
            <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-top: 8px solid #6E9B30; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #295457; padding-bottom: 20px; margin-bottom: 30px;">
                    <div>
                        <h1 style="color: #295457; margin: 0; font-size: 28px;">Hereford</h1>
                        <p style="color: #6E9B30; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; font-weight: bold;">Centro de Arbitraje y Conciliación</p>
                    </div>
                    <div style="text-align: right; color: #666; font-size: 12px;">
                        <p style="margin: 0;">Vo. 1 / Sep. - 2025</p>
                        <p style="margin: 5px 0 0 0;">2026</p>
                    </div>
                </div>

                <div style="margin-bottom: 40px;">
                    <p style="margin: 0; font-weight: bold;">Tuquerres Nariño, ${new Date().toLocaleDateString('es-CO')}</p>
                    <br/>
                    <p style="margin: 0;">Señores,</p>
                    <p style="margin: 0; font-weight: bold; font-size: 18px;">Centro de Arbitraje y Conciliación Hereford</p>
                    <p style="margin: 0;">E. S. D</p>
                </div>

                <h2 style="font-size: 22px; margin-bottom: 30px; color: #295457; border-bottom: 1px solid #eee; padding-bottom: 10px;">Escrito de Solicitud de ${data.tipoTramite === 'arbitraje' ? 'Arbitraje' : 'Conciliación'}</h2>

                <h3 style="color: #6E9B30; font-size: 18px; margin-top: 30px;">1. Designación de las partes</h3>
                
                <h4 style="margin-bottom: 5px; color: #295457;">1.1 Convocante</h4>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #295457; margin-bottom: 20px;">
                    <p style="margin: 0 0 5px 0;"><strong>Nombre Completo:</strong> ${data.convocante?.nombre || 'No provisto'}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Identificación:</strong> ${data.convocante?.identificacion || 'No provista'}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Correo Electrónico:</strong> ${data.convocante?.email || 'No provisto'}</p>
                    <p style="margin: 0;"><strong>Teléfono:</strong> ${data.convocante?.telefono || 'No provisto'}</p>
                </div>

                <h4 style="margin-bottom: 5px; color: #295457;">1.2 Convocado</h4>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #295457; margin-bottom: 20px;">
                    <p style="margin: 0 0 5px 0;"><strong>Nombre Completo:</strong> ${data.convocado?.nombre || 'No provisto'}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Identificación:</strong> ${data.convocado?.identificacion || 'No provista'}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Correo Electrónico:</strong> ${data.convocado?.email || 'No provisto'}</p>
                </div>

                <h3 style="color: #6E9B30; font-size: 18px; margin-top: 30px;">2. Apoderado</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #295457; margin-bottom: 20px;">
                    <p style="margin: 0 0 5px 0;"><strong>Nombre Completo:</strong> ${data.apoderado?.nombre || 'No aplica / No provisto'}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Tarjeta Profesional:</strong> ${data.apoderado?.tp || 'No provista'}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Correo Electrónico:</strong> ${data.apoderado?.email || 'No provisto'}</p>
                </div>

                <h3 style="color: #6E9B30; font-size: 18px; margin-top: 30px;">3. Hechos</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #295457; margin-bottom: 20px; white-space: pre-wrap;">${data.hechos || 'No se registraron hechos.'}</div>

                <h3 style="color: #6E9B30; font-size: 18px; margin-top: 30px;">4. Pretensiones</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #295457; margin-bottom: 20px; white-space: pre-wrap;">${data.pretensiones || 'No se registraron pretensiones.'}</div>
                
                <h3 style="color: #6E9B30; font-size: 18px; margin-top: 30px;">5. Fundamentos de Derecho</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #295457; margin-bottom: 20px; white-space: pre-wrap;">${data.fundamentos || 'No se registraron fundamentos.'}</div>

                <h3 style="color: #6E9B30; font-size: 18px; margin-top: 30px;">6. Cuantía</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #295457; margin-bottom: 20px;">
                    <p style="margin: 0;">Considero este trámite equivale a un monto de <strong>${data.cuantia ? '$' + data.cuantia : 'Indeterminada'}</strong> pesos COP.</p>
                </div>

                <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                    <p>NOTA: Esta solicitud de audiencia de conciliación siempre debe ser enviada al correo electrónico hereford@apolohub.com</p>
                    <p>Documento generado digitalmente por la plataforma Hereford Legaltech.</p>
                </div>
            </div>
        </div>
        `;

        let info = await transporter.sendMail({
            from: '"Hereford Legaltech" <noreply@hereford.com>',
            to: 'hereford@apolohub.com',
            subject: `Nueva Solicitud de ${data.tipoTramite === 'arbitraje' ? 'Arbitraje' : 'Conciliación'} - ${data.convocante?.nombre || 'Anónimo'}`,
            html: htmlContent,
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log('Mensaje enviado: %s', info.messageId);
        console.log('URL de vista previa: %s', previewUrl);

        res.status(200).json({ success: true, previewUrl });
    } catch (error) {
        console.error('Error enviando correo:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
