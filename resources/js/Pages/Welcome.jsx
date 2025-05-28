import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'
import SubButton from '@/Components/SubButton'
import TopCourseLayout from '@/Layouts/TopCourseLayout'


export default function Welcome({ auth }) {

    return (
        <>
            <Head title="トップページ" />
            <div className="h-full">
                <header className='h-96 bgCol01 grid grid-cols-2 gap-2'>
                    <div>
                        <h1 className='h1Tit zenMaru ml-5 pt-3'>もふっと予約</h1>
                    </div>
                    <div>
                        <nav className="-mx-3 flex flex-1 justify-end mr-5 pt-3">
                            <Link className='mr-2' href={route('reserve.course')}>
                                <PrimaryButton>予約はこちら</PrimaryButton>
                            </Link>
                            {auth.user ? (
                                <Link href={route('mypage')}>
                                    <SubButton>マイページ</SubButton>
                                </Link>
                                
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <SubButton>ログイン</SubButton>
                                    </Link>
                                    <Link href={route('register')}>
                                        <SubButton>新規登録</SubButton>
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="p-8">
                    <section className='bg-emerald-500 rounded-xl p-8 max-w-6xl m-auto mb-8 text-lg text-center text-white font-semibold'>
                            <p>ぬいぐるみ専門のケア予約システム「もふっと予約」へようこそ！</p>
                            <p>長年一緒に過ごしてきたぬいぐるみたちを、やさしくメンテナンスしませんか？</p>
                            <p>「ちょっと汚れが気になる」「ほつれてしまって心配」そんなときは、</p>
                            <p>私たちにお任せください。</p>
                            <p>手術・入浴、どちらのコースも心を込めて対応いたします。</p>
                    </section>
                    <section className='course max-w-6xl m-auto'>
                        <h2 className='h2Tit zenMaru text-center mb-5'>
                            コースについて
                        </h2>
                            <TopCourseLayout/>
                    </section>
                </main>
            </div>
        </>
    );
}
