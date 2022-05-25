// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const PdfViewer = () => {

    const params = useParams();
    const [pdf, changePdf] = useState(false);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // pdf file onChange state
    const [pdfFile, setPdfFile] = useState(null);

    // pdf file error state
    const [pdfError, setPdfError] = useState('');

    const allowedFiles = ['application/pdf'];

    console.log(params)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/pdfName`, {
            headers: {
                id: params.id,
                func: params.func
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if(response){
                const file = require(`../../outerRes/${response.name}`);
            changePdf(file)
            }
            
        })
    }, [])

    return (
        <div>
            {pdf && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdf}
                        plugins={[defaultLayoutPluginInstance]}></Viewer>
                </Worker>
            )}
            {!pdf && "Not Available"}
        </div>
    )
}

export default PdfViewer