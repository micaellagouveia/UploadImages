import React from 'react'
import CircularProgressBar from 'react-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import { Container, FileInfo, Preview } from './styles';

const FileList = () => (
    <Container>
        <li>
            <FileInfo>
                <Preview src="http://localhost:3000/files/c4905a41ffd973b9cf1c8f6f23d52483-1.png"></Preview>
                <div>
                    <strong>1.png</strong>
                    <span>64kb</span>
                    <button onClick={() => { }} >Excluir</button>
                </div>
            </FileInfo>
            <div>
                <CircularProgressBar
                    styles={{
                        root: { width: 24 },
                        path: { stroke: '#7159c1' }
                    }}
                    strokeWidth={10}
                    percentage={60}
                />

                <a
                    href='http://localhost:3000/files/c4905a41ffd973b9cf1c8f6f23d52483-1.png'
                    target="_blank"
                    rel="noopner noreferrer">

                    <MdLink style={{ maginRight: 8 }} size={24} color="#222" />
                </a>

                <MdCheckCircle size={24} color="#78e5d5" />
                <MdError size={24} color="#e57878" />
            </div>

        </li>
    </Container>)


export default FileList
