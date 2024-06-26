import Link from 'next/link'
import styles from './styles.module.scss'
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useState } from 'react';


export function Header(){

    const {signOut} = useContext(AuthContext)

  
  
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                   <img src="/logo.svg" width={450} height={60} />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/Mesa"> Pedido</Link>
                    
                    <Link href="/categoria">Categoria </Link>

                    <Link href="/produto">Produto</Link>
                     
                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>

                </nav>

            </div>
          
        </header>
    )
}
