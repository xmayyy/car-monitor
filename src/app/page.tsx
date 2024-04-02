'use client';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
export default function Home() {
	const router = useRouter();
	const options = [
		{
			name: '开始使用',
			dsc: 'Get started with the system',
			path: '/home',
		},
		{
			name: '简介',
			dsc: 'Brief introduction',
			path: '/introduce',
		},
	];
	const handleClickRouter = (path: string) => {
		router.push(path);
	};
	return (
			<main className={styles.main}>
				<div className={styles.description}>
					<p>
						保卫驾驶安全&nbsp;
						<code className={styles.code}>
							Protect the safety of the driver
						</code>
					</p>
					<div>
						<h2>By xma</h2>
					</div>
				</div>

				<div className={styles.center}>
					<h1>驾驶行为监控系统</h1>
				</div>

				<div className={styles.grid}>
					{options.map((item) => {
						return (
							<a
								key={item.name}
								className={styles.card}
								onClick={() => handleClickRouter(item.path)}
								rel="noopener noreferrer"
							>
								<h2>
									{item.name} <span>-&gt;</span>
								</h2>
								<p>{item.dsc}</p>
							</a>
						);
					})}
				</div>
			</main>
	);
}
