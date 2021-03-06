const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeBooksArray() {
	return [
		{
			id: "1",
			title: "The Great Gatsby",
			author: "F Scott Fitzgerald",
			cover_img:
				"https://res.cloudinary.com/unprinted/image/upload/v1592686822/unprinted-images/ex_book_1_ypo4yj.jpg",
			content:
				'[{"section": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat suscipit enim at venenatis. Duis nunc risus, lacinia ut massa quis, posuere aliquet quam. Fusce eros risus, lobortis vitae felis et, consectetur posuere neque. Duis eu ultrices urna. Quisque dictum nunc ex, sed scelerisque sem pulvinar vitae. Nam a pretium eros, sit amet pretium nibh. Donec nec lorem dolor. Maecenas id eros sem. Ut pulvinar eros ac tellus varius feugiat. Ut ullamcorper leo a ipsum aliquet pretium. Integer vel eros sed elit dignissim elementum. Sed quis semper tellus. Nullam placerat scelerisque leo. Pellentesque eget diam feugiat, viverra felis id, venenatis enim. Phasellus suscipit metus vel mi bibendum, vitae fermentum risus hendrerit. Donec sagittis justo imperdiet nibh tempus lobortis. Morbi eu egestas nisl. Praesent congue quam nec euismod tempus. Vivamus ac nisi rutrum mi egestas vulputate sed et ipsum. In sem augue, dictum ut neque at, congue congue urna. Donec feugiat sagittis libero. Mauris semper enim nisi. Donec in hendrerit sem, eu accumsan diam. Maecenas convallis nisl vel lorem aliquet gravida."}, {"section": 2, "content": "Vivamus accumsan purus in ullamcorper pulvinar. Sed sollicitudin, nibh et dignissim convallis, dui lorem vehicula augue, sit amet interdum elit felis et lectus. Aliquam quis metus non diam tincidunt consectetur. Curabitur varius convallis maximus. Cras ex metus, pretium eget leo eget, tempus aliquet lectus. Morbi quam diam, viverra in tempus quis, ultricies ut mauris. Duis volutpat tellus in dui faucibus, vitae feugiat velit feugiat. Aenean semper metus enim, in lobortis ipsum bibendum et. Vivamus pellentesque lacus aliquet dolor tempus molestie. Vivamus a nulla orci. Nulla vel dolor et nulla pellentesque dignissim quis nec orci. Donec lobortis auctor placerat. Pellentesque tempus nec urna ac venenatis. Cras eu felis auctor, sollicitudin nibh vel, pharetra tellus. Integer gravida faucibus ligula, a eleifend lectus. Integer iaculis dolor id euismod convallis. Mauris volutpat efficitur placerat. Nunc sit amet ultrices nulla. Vestibulum sit amet accumsan lorem. Nunc dignissim orci mi, at ullamcorper metus sagittis a. Cras vitae sapien aliquet, venenatis lacus at, mattis nisl. Phasellus a rhoncus nibh, quis vulputate augue."}]',
			summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			price: "5.00",
			created_by: "2",
		},
		{
			id: "2",
			title: "The War of the Worlds",
			author: "H.G. Wells",
			cover_img:
				"https://res.cloudinary.com/unprinted/image/upload/v1592686824/unprinted-images/ex_book_2_poeczi.jpg",
			content:
				'[{"section": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat suscipit enim at venenatis. Duis nunc risus, lacinia ut massa quis, posuere aliquet quam. Fusce eros risus, lobortis vitae felis et, consectetur posuere neque. Duis eu ultrices urna. Quisque dictum nunc ex, sed scelerisque sem pulvinar vitae. Nam a pretium eros, sit amet pretium nibh. Donec nec lorem dolor. Maecenas id eros sem. Ut pulvinar eros ac tellus varius feugiat. Ut ullamcorper leo a ipsum aliquet pretium. Integer vel eros sed elit dignissim elementum. Sed quis semper tellus. Nullam placerat scelerisque leo. Pellentesque eget diam feugiat, viverra felis id, venenatis enim. Phasellus suscipit metus vel mi bibendum, vitae fermentum risus hendrerit. Donec sagittis justo imperdiet nibh tempus lobortis. Morbi eu egestas nisl. Praesent congue quam nec euismod tempus. Vivamus ac nisi rutrum mi egestas vulputate sed et ipsum. In sem augue, dictum ut neque at, congue congue urna. Donec feugiat sagittis libero. Mauris semper enim nisi. Donec in hendrerit sem, eu accumsan diam. Maecenas convallis nisl vel lorem aliquet gravida."}, {"section": 2, "content": "Vivamus accumsan purus in ullamcorper pulvinar. Sed sollicitudin, nibh et dignissim convallis, dui lorem vehicula augue, sit amet interdum elit felis et lectus. Aliquam quis metus non diam tincidunt consectetur. Curabitur varius convallis maximus. Cras ex metus, pretium eget leo eget, tempus aliquet lectus. Morbi quam diam, viverra in tempus quis, ultricies ut mauris. Duis volutpat tellus in dui faucibus, vitae feugiat velit feugiat. Aenean semper metus enim, in lobortis ipsum bibendum et. Vivamus pellentesque lacus aliquet dolor tempus molestie. Vivamus a nulla orci. Nulla vel dolor et nulla pellentesque dignissim quis nec orci. Donec lobortis auctor placerat. Pellentesque tempus nec urna ac venenatis. Cras eu felis auctor, sollicitudin nibh vel, pharetra tellus. Integer gravida faucibus ligula, a eleifend lectus. Integer iaculis dolor id euismod convallis. Mauris volutpat efficitur placerat. Nunc sit amet ultrices nulla. Vestibulum sit amet accumsan lorem. Nunc dignissim orci mi, at ullamcorper metus sagittis a. Cras vitae sapien aliquet, venenatis lacus at, mattis nisl. Phasellus a rhoncus nibh, quis vulputate augue."}]',
			summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			price: "5.00",
			created_by: "2",
		},
		{
			id: "3",
			title: "The Wizard of Oz",
			author: "L Frank Baum",
			cover_img:
				"https://res.cloudinary.com/unprinted/image/upload/v1592686823/unprinted-images/ex_book_3_j06t3n.png",
			content:
				'[{"section": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat suscipit enim at venenatis. Duis nunc risus, lacinia ut massa quis, posuere aliquet quam. Fusce eros risus, lobortis vitae felis et, consectetur posuere neque. Duis eu ultrices urna. Quisque dictum nunc ex, sed scelerisque sem pulvinar vitae. Nam a pretium eros, sit amet pretium nibh. Donec nec lorem dolor. Maecenas id eros sem. Ut pulvinar eros ac tellus varius feugiat. Ut ullamcorper leo a ipsum aliquet pretium. Integer vel eros sed elit dignissim elementum. Sed quis semper tellus. Nullam placerat scelerisque leo. Pellentesque eget diam feugiat, viverra felis id, venenatis enim. Phasellus suscipit metus vel mi bibendum, vitae fermentum risus hendrerit. Donec sagittis justo imperdiet nibh tempus lobortis. Morbi eu egestas nisl. Praesent congue quam nec euismod tempus. Vivamus ac nisi rutrum mi egestas vulputate sed et ipsum. In sem augue, dictum ut neque at, congue congue urna. Donec feugiat sagittis libero. Mauris semper enim nisi. Donec in hendrerit sem, eu accumsan diam. Maecenas convallis nisl vel lorem aliquet gravida."}, {"section": 2, "content": "Vivamus accumsan purus in ullamcorper pulvinar. Sed sollicitudin, nibh et dignissim convallis, dui lorem vehicula augue, sit amet interdum elit felis et lectus. Aliquam quis metus non diam tincidunt consectetur. Curabitur varius convallis maximus. Cras ex metus, pretium eget leo eget, tempus aliquet lectus. Morbi quam diam, viverra in tempus quis, ultricies ut mauris. Duis volutpat tellus in dui faucibus, vitae feugiat velit feugiat. Aenean semper metus enim, in lobortis ipsum bibendum et. Vivamus pellentesque lacus aliquet dolor tempus molestie. Vivamus a nulla orci. Nulla vel dolor et nulla pellentesque dignissim quis nec orci. Donec lobortis auctor placerat. Pellentesque tempus nec urna ac venenatis. Cras eu felis auctor, sollicitudin nibh vel, pharetra tellus. Integer gravida faucibus ligula, a eleifend lectus. Integer iaculis dolor id euismod convallis. Mauris volutpat efficitur placerat. Nunc sit amet ultrices nulla. Vestibulum sit amet accumsan lorem. Nunc dignissim orci mi, at ullamcorper metus sagittis a. Cras vitae sapien aliquet, venenatis lacus at, mattis nisl. Phasellus a rhoncus nibh, quis vulputate augue."}]',
			summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			price: "5.00",
			created_by: "2",
		},
		{
			id: "4",
			title: "Sherlock Holmes",
			author: "Sir Authur Conan Doyle",
			cover_img:
				"https://res.cloudinary.com/unprinted/image/upload/v1592686823/unprinted-images/ex_book_4_i3wqmj.jpg",
			content:
				'[{"section": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat suscipit enim at venenatis. Duis nunc risus, lacinia ut massa quis, posuere aliquet quam. Fusce eros risus, lobortis vitae felis et, consectetur posuere neque. Duis eu ultrices urna. Quisque dictum nunc ex, sed scelerisque sem pulvinar vitae. Nam a pretium eros, sit amet pretium nibh. Donec nec lorem dolor. Maecenas id eros sem. Ut pulvinar eros ac tellus varius feugiat. Ut ullamcorper leo a ipsum aliquet pretium. Integer vel eros sed elit dignissim elementum. Sed quis semper tellus. Nullam placerat scelerisque leo. Pellentesque eget diam feugiat, viverra felis id, venenatis enim. Phasellus suscipit metus vel mi bibendum, vitae fermentum risus hendrerit. Donec sagittis justo imperdiet nibh tempus lobortis. Morbi eu egestas nisl. Praesent congue quam nec euismod tempus. Vivamus ac nisi rutrum mi egestas vulputate sed et ipsum. In sem augue, dictum ut neque at, congue congue urna. Donec feugiat sagittis libero. Mauris semper enim nisi. Donec in hendrerit sem, eu accumsan diam. Maecenas convallis nisl vel lorem aliquet gravida."}, {"section": 2, "content": "Vivamus accumsan purus in ullamcorper pulvinar. Sed sollicitudin, nibh et dignissim convallis, dui lorem vehicula augue, sit amet interdum elit felis et lectus. Aliquam quis metus non diam tincidunt consectetur. Curabitur varius convallis maximus. Cras ex metus, pretium eget leo eget, tempus aliquet lectus. Morbi quam diam, viverra in tempus quis, ultricies ut mauris. Duis volutpat tellus in dui faucibus, vitae feugiat velit feugiat. Aenean semper metus enim, in lobortis ipsum bibendum et. Vivamus pellentesque lacus aliquet dolor tempus molestie. Vivamus a nulla orci. Nulla vel dolor et nulla pellentesque dignissim quis nec orci. Donec lobortis auctor placerat. Pellentesque tempus nec urna ac venenatis. Cras eu felis auctor, sollicitudin nibh vel, pharetra tellus. Integer gravida faucibus ligula, a eleifend lectus. Integer iaculis dolor id euismod convallis. Mauris volutpat efficitur placerat. Nunc sit amet ultrices nulla. Vestibulum sit amet accumsan lorem. Nunc dignissim orci mi, at ullamcorper metus sagittis a. Cras vitae sapien aliquet, venenatis lacus at, mattis nisl. Phasellus a rhoncus nibh, quis vulputate augue."}]',
			summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			price: "5.00",
			created_by: "2",
		},
		{
			id: "5",
			title: "Harry Potter and the Sorcerer's Stone",
			author: "J K Rowling",
			cover_img:
				"https://res.cloudinary.com/unprinted/image/upload/v1592686824/unprinted-images/ex_book_5_pnsoha.jpg",
			content:
				'[{"section": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat suscipit enim at venenatis. Duis nunc risus, lacinia ut massa quis, posuere aliquet quam. Fusce eros risus, lobortis vitae felis et, consectetur posuere neque. Duis eu ultrices urna. Quisque dictum nunc ex, sed scelerisque sem pulvinar vitae. Nam a pretium eros, sit amet pretium nibh. Donec nec lorem dolor. Maecenas id eros sem. Ut pulvinar eros ac tellus varius feugiat. Ut ullamcorper leo a ipsum aliquet pretium. Integer vel eros sed elit dignissim elementum. Sed quis semper tellus. Nullam placerat scelerisque leo. Pellentesque eget diam feugiat, viverra felis id, venenatis enim. Phasellus suscipit metus vel mi bibendum, vitae fermentum risus hendrerit. Donec sagittis justo imperdiet nibh tempus lobortis. Morbi eu egestas nisl. Praesent congue quam nec euismod tempus. Vivamus ac nisi rutrum mi egestas vulputate sed et ipsum. In sem augue, dictum ut neque at, congue congue urna. Donec feugiat sagittis libero. Mauris semper enim nisi. Donec in hendrerit sem, eu accumsan diam. Maecenas convallis nisl vel lorem aliquet gravida."}, {"section": 2, "content": "Vivamus accumsan purus in ullamcorper pulvinar. Sed sollicitudin, nibh et dignissim convallis, dui lorem vehicula augue, sit amet interdum elit felis et lectus. Aliquam quis metus non diam tincidunt consectetur. Curabitur varius convallis maximus. Cras ex metus, pretium eget leo eget, tempus aliquet lectus. Morbi quam diam, viverra in tempus quis, ultricies ut mauris. Duis volutpat tellus in dui faucibus, vitae feugiat velit feugiat. Aenean semper metus enim, in lobortis ipsum bibendum et. Vivamus pellentesque lacus aliquet dolor tempus molestie. Vivamus a nulla orci. Nulla vel dolor et nulla pellentesque dignissim quis nec orci. Donec lobortis auctor placerat. Pellentesque tempus nec urna ac venenatis. Cras eu felis auctor, sollicitudin nibh vel, pharetra tellus. Integer gravida faucibus ligula, a eleifend lectus. Integer iaculis dolor id euismod convallis. Mauris volutpat efficitur placerat. Nunc sit amet ultrices nulla. Vestibulum sit amet accumsan lorem. Nunc dignissim orci mi, at ullamcorper metus sagittis a. Cras vitae sapien aliquet, venenatis lacus at, mattis nisl. Phasellus a rhoncus nibh, quis vulputate augue."}]',
			summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			price: "5.00",
			created_by: "2",
		},
		{
			id: "6",
			title: "Moby Dick",
			author: "Herman Melville",
			cover_img:
				"https://res.cloudinary.com/unprinted/image/upload/v1592686823/unprinted-images/ex_book_6_agrqxq.png",
			content:
				'[{"section": 1, "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique tempor nisl in blandit. Duis finibus, felis ac consectetur eleifend, dui ante pretium urna, quis dapibus tortor nisi in arcu. Aenean nulla risus, ultrices ac libero sit amet, pellentesque dictum dolor. Etiam consequat dolor sed arcu dignissim pharetra. In at dui nec eros sodales hendrerit. Suspendisse a lobortis neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse nibh eros, porttitor eu venenatis id, iaculis vitae nunc. In hac habitasse platea dictumst. Quisque at rutrum mi. Praesent non pellentesque quam. Morbi maximus nibh justo, et tempus lacus ultricies suscipit. Pellentesque eu lorem at lacus malesuada vehicula. Phasellus vehicula, purus et facilisis malesuada, neque lorem pulvinar magna, id sagittis diam augue dictum sapien. Vestibulum non velit volutpat, venenatis leo eu, euismod purus. Praesent nec dolor pellentesque, luctus ipsum sed, pulvinar lorem. In erat nisi, ullamcorper a lectus in, viverra lacinia massa. Proin ultricies condimentum sem convallis varius. Morbi ullamcorper turpis purus, sed tincidunt massa sollicitudin non. Curabitur dolor dolor, posuere ac egestas vitae, accumsan in lorem. Curabitur eget purus eu nulla commodo dignissim id vel augue. Ut augue turpis, dapibus id viverra id, bibendum a odio. Nam tincidunt pulvinar velit ac tincidunt. Nam odio dolor, ullamcorper volutpat fringilla eget, cursus at ex. In efficitur varius rutrum. Pellentesque placerat neque finibus viverra bibendum. Fusce vestibulum nisl justo, ac sodales velit consequat sed. Suspendisse potenti. Nunc vulputate iaculis eros, quis fringilla felis aliquet nec. Vestibulum nec fringilla sem. Vivamus faucibus ex est, sed suscipit nibh pretium quis. Integer a ligula tortor. Nulla ornare sapien quis turpis ultricies elementum. In cursus porttitor commodo. Praesent blandit lectus ac vestibulum malesuada. Proin porttitor vestibulum porta. Vestibulum venenatis purus eros, a iaculis nisi bibendum in. Quisque molestie scelerisque sem ac tristique. Morbi nunc risus, pulvinar feugiat gravida et, consectetur eu justo. Nullam blandit condimentum tellus, eget varius mauris laoreet id. Donec dictum vehicula massa sed dictum. Donec nec leo sapien. Cras commodo dui est, a lobortis purus vehicula sit amet. Maecenas ut leo leo. Praesent sit amet nibh leo. Proin vestibulum arcu velit, facilisis posuere metus varius et. Cras vitae dui posuere, malesuada nisl at, mattis tellus. In hac habitasse platea dictumst. Nullam vitae lacus non elit scelerisque placerat sed in urna. Aenean sit amet arcu sodales, interdum erat in, sollicitudin lectus. Phasellus scelerisque tristique neque sed eleifend. Integer in placerat elit. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus consectetur molestie justo, in dictum magna semper ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus eu mi porta sem ullamcorper elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque fringilla sed odio fringilla maximus. Vestibulum et ex dolor. Morbi sed libero ut purus interdum semper. Nullam elementum purus in lectus egestas dapibus. Quisque purus lorem, dignissim a pulvinar ac, tempus rhoncus quam. Nulla efficitur dignissim nisl, eget placerat eros pellentesque eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed semper ultrices magna. Nam vel dictum ligula, a suscipit mauris. Integer quis lectus sodales odio finibus viverra in vitae est. Vivamus laoreet risus congue lectus luctus aliquam. Sed pretium egestas pulvinar. Nulla nunc dolor, vehicula id metus vitae, vestibulum lacinia lectus. Nullam semper rhoncus magna, et volutpat sapien porttitor eget. Phasellus non dolor ac massa ullamcorper scelerisque sed ac sem. Nam feugiat risus sed sodales elementum. Quisque a luctus erat. Nulla ac nunc nunc. Praesent ut velit mi. Phasellus vitae gravida arcu. Nullam congue nisi sit amet neque hendrerit, iaculis suscipit erat pretium. Suspendisse a dictum leo. Proin eu urna urna. In lobortis, est ac tempor blandit, metus dui faucibus eros, et placerat urna quam in libero. Curabitur imperdiet, arcu non ornare ullamcorper, risus odio imperdiet ipsum, eu gravida tortor ante vitae dolor. Quisque eu pharetra sapien. Sed semper nunc eu placerat condimentum. Suspendisse in quam vitae dui tempus venenatis ut a lectus. Nullam ornare leo eu ante euismod rhoncus. Duis gravida arcu fringilla porta accumsan. Duis commodo tincidunt sodales. Duis imperdiet ipsum quis felis vestibulum tincidunt. Fusce eget risus id nibh cursus placerat. Integer sed justo est. Aliquam mi est, tristique at ex at, pellentesque viverra ipsum. Sed posuere vitae purus in aliquet. Sed ipsum tellus, aliquet malesuada nulla vel, commodo mollis sem. Sed velit ipsum, condimentum sit amet blandit et, pharetra quis odio. Nullam semper odio et est consectetur, sed ultricies turpis blandit. Nunc fermentum nibh imperdiet nisi tincidunt sollicitudin quis et lorem. Etiam feugiat sollicitudin risus eu pulvinar. Duis pellentesque bibendum sapien ut ornare. Vivamus volutpat ultricies augue sit amet lobortis. Mauris scelerisque, est a consectetur semper, est felis consectetur dui, sed dictum mauris lectus sit amet risus. Aenean maximus elit eu odio egestas, eu lobortis metus gravida. Fusce id vestibulum risus. Vivamus nisl lorem, faucibus ac eleifend vel, malesuada feugiat mauris. Curabitur auctor velit id ipsum venenatis, ut pulvinar ipsum scelerisque. Etiam a nulla interdum, egestas erat et, lacinia erat. Vivamus in consequat nunc. Phasellus dapibus, lorem vel auctor posuere, purus enim condimentum orci, vel luctus justo lectus ut tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent eget mollis eros, eu malesuada dolor. Suspendisse potenti. Ut eu nibh dolor. Morbi sed nisl ut est semper auctor eget ac enim. Praesent aliquet tellus sed libero tincidunt porttitor. In id lacinia quam. Morbi sed imperdiet sapien. Mauris hendrerit risus nec tortor ullamcorper, vitae lacinia turpis ullamcorper. Integer rutrum blandit pellentesque. Proin pulvinar condimentum mauris. Ut a libero odio. Donec maximus aliquam posuere. Fusce aliquam maximus dolor, quis volutpat enim. Sed a dignissim dui. Ut non nibh ut neque ullamcorper pulvinar. Sed at lectus sit amet magna tempus convallis in in orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu dui justo. Nulla ullamcorper scelerisque ipsum a maximus. Proin eu lacinia ligula, non gravida justo. Donec sollicitudin tortor ligula, vulputate ornare erat fermentum a. Sed tempor id enim a placerat. Integer sed justo commodo, mattis ipsum eget, euismod tortor. Aliquam molestie purus vitae bibendum congue. Nulla facilisi. Nulla feugiat augue lacus. Nulla vel nibh at tellus bibendum semper. Nulla blandit condimentum leo, a vehicula odio auctor et. Nulla dolor odio, sagittis ut pellentesque id, euismod posuere tortor. Vestibulum tincidunt elementum odio vitae tempus. Morbi euismod id lectus quis viverra. Duis laoreet nec ipsum sit amet consequat. Maecenas velit nisi, facilisis vel nunc id, mattis varius mi. Nunc viverra orci id mattis ornare. Sed malesuada porttitor nisi, sit amet rutrum metus tincidunt eleifend. Praesent volutpat tincidunt massa, nec finibus est varius ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur vehicula tempor neque, eu condimentum leo sodales at. Vivamus ac eros congue, auctor magna vitae, pulvinar elit. Etiam cursus aliquam nibh nec convallis. Cras ultrices ex nec sem fringilla tempor vel nec tellus. Suspendisse scelerisque quis diam nec sodales. Curabitur non auctor felis, vitae mollis nulla. Aliquam maximus ultrices enim at consectetur. Vivamus pulvinar consectetur vestibulum. Vestibulum imperdiet ipsum molestie mollis aliquam. Curabitur eu neque ut elit molestie pellentesque. Praesent sodales nibh ex, id gravida felis fermentum in. Aenean id dui in nisl bibendum commodo id eget neque. Suspendisse interdum velit et lorem iaculis, feugiat posuere felis aliquam. In blandit felis ut ultrices consequat. Nullam vulputate ex ac rhoncus feugiat. Integer sit amet aliquam nisl, ut euismod diam. Suspendisse elementum ex a magna fringilla, blandit ultrices purus lacinia. Suspendisse a metus et odio porta lacinia. Duis vestibulum, est in viverra fringilla, leo leo fringilla orci, a varius sapien tortor quis lorem. Aenean id odio a sapien scelerisque ultrices at vel lacus. Nulla facilisi. Morbi id magna scelerisque, interdum risus sed, tincidunt tortor. Curabitur porttitor dignissim nisi nec auctor. Nulla ultricies leo ac tortor ultricies finibus sit amet in urna. Curabitur lobortis, metus eget luctus finibus, nisl tortor lobortis risus, a pretium est lacus mollis eros. Proin pretium porta lorem vitae finibus. Suspendisse tristique nunc id sapien pharetra, in consequat lectus volutpat. Vestibulum rutrum pulvinar quam malesuada mollis. Aliquam placerat euismod libero, eget convallis orci molestie ac. Integer ut facilisis elit, sit amet venenatis sapien. Cras molestie facilisis ex nec iaculis. Morbi fermentum ipsum metus, id accumsan lorem mollis ut. Sed finibus luctus magna id blandit. Nulla fermentum et sem vel scelerisque. Etiam a consequat est. Aenean ut pulvinar ante. Integer sollicitudin aliquet erat malesuada blandit. Curabitur maximus lorem eu urna vulputate, vitae ultricies ipsum consequat. Sed nisl sapien, auctor sed ante id, laoreet ultr Duis varius diam quis urna dignissim, sit amet semper orci convallis. Nam in massa eu arcu ultrices volutpat ac vel nulla. Phasellus ornare tempus nunc eget auctor. Curabitur et porta nisi. Etiam libero arcu, tincidunt a la"}, {"section": 2, "content": "Vivamus accumsan purus in ullamcorper pulvinar. Sed sollicitudin, nibh et dignissim convallis, dui lorem vehicula augue, sit amet interdum elit felis et lectus. Aliquam quis metus non diam tincidunt consectetur. Curabitur varius convallis maximus. Cras ex metus, pretium eget leo eget, tempus aliquet lectus. Morbi quam diam, viverra in tempus quis, ultricies ut mauris. Duis volutpat tellus in dui faucibus, vitae feugiat velit feugiat. Aenean semper metus enim, in lobortis ipsum bibendum et. Vivamus pellentesque lacus aliquet dolor tempus molestie. Vivamus a nulla orci. Nulla vel dolor et nulla pellentesque dignissim quis nec orci. Donec lobortis auctor placerat. Pellentesque tempus nec urna ac venenatis. Cras eu felis auctor, sollicitudin nibh vel, pharetra tellus. Integer gravida faucibus ligula, a eleifend lectus. Integer iaculis dolor id euismod convallis. Mauris volutpat efficitur placerat. Nunc sit amet ultrices nulla. Vestibulum sit amet accumsan lorem. Nunc dignissim orci mi, at ullamcorper metus sagittis a. Cras vitae sapien aliquet, venenatis lacus at, mattis nisl. Phasellus a rhoncus nibh, quis vulputate augue."}]',
			summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			price: "5.00",
			created_by: "2",
		},
	];
}

function makeUsersArray() {
	return [
		{
			id: 1,
			name: "Izaac Abrams",
			email: "izaac.abrams25@gmail.com",
			password: "$2a$12$dIm5zAMfACbGu.IixuCbhOWiAZPd3lhlkaWqpe1HIE7ChgMh0sJfK",
			purchased: "{0, 1, 2, 3, 4, 5}",
		},
		{
			id: 2,
			name: "Leela Brown",
			email: "leela@gmail.com",
			password: "$2a$12$uoLZIdE.s9Z8FeY34wRUiuuYL6wKBiwdhyHWc.BmfnxSpkVNbMIGi",
			purchased: "{1, 2}",
		},
		{
			id: 3,
			name: "Demo User",
			email: "demo@demo.com",
			password: "$2a$12$SR37Rtez4pcge62gBg8cwu0L6JYy5dWBetFRXjBjDbgYxaVvrVaOy",
			purchased: "{1, 3, 5}",
		},
	];
}

function makeExpectedBook(book) {
	return {
		id: parseInt(book.id),
		title: book.title,
		author: book.author,
		cover_img: book.cover_img,
		content: book.content,
		summary: book.summary,
		price: book.price,
		created_by: book.created_by,
	};
}

function makeMaliciousBook() {
	const maliciousBook = {
		id: 404,
		title: 'Naughty <script>alert("xss");</script>',
		author: "<script>xssattack</script>",
		cover_img: "<a>https://bad.com</a>",
		content: JSON.stringify([
			{
				section: "1",
				content: "<script>console.log('xss')</script>60",
			},
		]),
		summary: "This is an <inline>xss attack</inline>",
		price: "5",
	};

	const expectedBook = {
		id: 404,
		title: 'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
		author: "",
		cover_img: "",
		content: `[{"section":"1","content":"&lt;script&gt;console.log('xss')&lt;/script&gt;60"}]`,
		summary: "",
		price: "5",
	};
	return maliciousBook, expectedBook;
}

function seedMaliciousBook(db, user, book) {
	return seedUsers(db, [user]).then(() =>
		db.into("unprinted_books").insert([book])
	);
}

function seedUsers(db, users) {
	const preppedUsers = users.map((user) => ({
		...user,
		password: bcrypt.hashSync(user.password, 1),
	}));
	return db
		.into("unprinted_users")
		.insert(preppedUsers)
		.then(() =>
			db.raw(`SELECT setval('unprinted_users_id_seq', ?)`, [
				users[users.length - 1].id,
			])
		);
}

function seedAccount(db) {
	const account = {
		user_id: "1",
		account_id: "acct_1Gy1qDCrDBkfc4zR",
	};
	return db.into("unprinted_accounts").insert(account);
}
function seedBooks(db, books) {
	return db
		.into("unprinted_books")
		.insert(books)
		.then(() =>
			db.raw(`SELECT setval('unprinted_books_id_seq', ?)`, [
				books[books.length - 1].id,
			])
		);
}

function makeUnprintedFixtures() {
	const testUsers = makeUsersArray();
	const testBooks = makeBooksArray();
	return { testUsers, testBooks };
}

function cleanTables(db) {
	return db.transaction((trx) =>
		trx
			.raw(
				`TRUNCATE 
      unprinted_books,
      unprinted_users,
      unprinted_accounts
      `
			)
			.then(() =>
				Promise.all([
					trx.raw(
						`ALTER SEQUENCE unprinted_books_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(
						`ALTER SEQUENCE unprinted_users_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(
						`ALTER SEQUENCE unprinted_accounts_id_seq minvalue 0 START WITH 1`
					),
					trx.raw(`SELECT setval('unprinted_books_id_seq', 0)`),
					trx.raw(`SELECT setval('unprinted_users_id_seq', 0)`),
					trx.raw(`SELECT setval('unprinted_accounts_id_seq', 0)`),
				])
			)
	);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
	const token = jwt.sign({ user_id: user.id }, secret, {
		subject: user.email,
		algorithm: "HS256",
	});
	return `Bearer ${token}`;
}

module.exports = {
	makeBooksArray,
	makeUsersArray,
	makeMaliciousBook,
	makeUnprintedFixtures,
	makeExpectedBook,
	makeAuthHeader,
	cleanTables,
	seedBooks,
	seedMaliciousBook,
	seedUsers,
	seedAccount,
};
