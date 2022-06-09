//Imports do Next/React
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

//Imports do projeto.
import styles from '../../../styles/Jogo.module.css'
import Porta from '../../../components/Porta'
import {atualizarPortas, criarPortas } from '../../../functions/portas'
import PortaModel from '../../../model/porta'

export default function Jogo(){

    const router = useRouter()

    const[valido, setValido] = useState(false)
    const [portas , setPortas] = useState([]);


    useEffect(() => {
        const portas = +router.query.portas
        const temPresente = +router.query.temPresente

        const qtdePortasValidas = portas >= 3 && portas <= 20
        const temPresenteValido = temPresente >= 1 && temPresente <= portas
        
        setValido(qtdePortasValidas&& temPresenteValido)
    }, [portas, router.query.portas, router.query.temPresente])

    
    useEffect(() => {
        const portas = +router.query.portas
        const temPresente = +router.query.temPresente
        setPortas(criarPortas(portas, temPresente))
        console.log('UserEffect: ')
    }, [router?.query])
    

    function renderizarPortas(){
  
      return  portas.map(porta => <Porta key={porta.numero} value={porta} 
        onChange={novaPorta => setPortas(atualizarPortas(portas,novaPorta))}/>)
  
    }
    
    
    return (
  
        <div id={styles.jogo}>

            <div className={styles.portas}>
                { valido ? renderizarPortas() : <h1>Valores Invalidos!</h1>}
            </div>

            <div className={styles.botoes}>
                <Link href="/">
                        <button>Reiniciar o Jogo</button>
                </Link>
            </div>

        </div>
  
    )
}