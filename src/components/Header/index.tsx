import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

export default function Header() {
  //const currentDate = new Date().toLocaleDateString('pt-BR',{dateStyle: 'medium'});
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });
  return (
    <header className={styles.container}>
      <Link href={'/'}><img src="/logo.svg" alt="logo" /></Link>
      <p>O melhor para você ouvir sempre</p>
      <span>{currentDate}</span>
    </header>
  )
}