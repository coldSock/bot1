var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { upLog } from '../../utils/updateLog.js';
import { Keys } from '../../keys.js';
import { db } from '../../../db/index.ts';
import * as schema from '#../../../db/schema.ts';
export default function (oldMember, newMember, client, handler, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (oldMember.roles.cache.size === newMember.roles.cache.size)
            return;
        const isValid = (role) => role.name !== '@everyone';
        const oldDisplayRoles = [...oldMember.roles.cache.values()]
            .map((role) => role)
            .filter(isValid)
            .join(', ');
        const newDisplayRoles = [...newMember.roles.cache.values()]
            .map((role) => role)
            .filter(isValid)
            .join(', ');
        if (!user) {
            const users = yield db.select().from(schema.users);
            console.log(users);
        }
        const logChannel = yield client.channels.fetch(Keys.logChannel);
        const logInvoke = upLog(oldMember, newMember, oldDisplayRoles, newDisplayRoles, client);
        yield logChannel.send({ embeds: [logInvoke] });
    });
}
