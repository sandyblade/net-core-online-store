/**
 * This file is part of the Sandy Andryanto Blog Application.
 *
 * @author     Sandy Andryanto <sandy.andryanto.blade@gmail.com>
 * @copyright  2025
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

using backend.Models.Repositories.Interfaces;

namespace backend.Models
{
    public class AppSeed
    {
        private readonly IUserRepository _userRepository;

        public AppSeed(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void run()
        {
            _userRepository.CreateInitial();
        }

    }
}
